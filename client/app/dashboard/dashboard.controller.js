import Highcharts from 'highcharts';
import moment from 'moment';
class DashboardController {
    constructor($scope, DashboardService) {
        'ngInject';
        const profileStatus = {
            IN_RANGE: 'IN_RANGE',
            COOLER_ON: 'COOLER_ON',
            COOLING: 'COOLING',
            COOLER_OFF: 'COOLER_OFF',
            HEATER_ON: 'HEATER_ON',
            HEATING: 'HEATING',
            HEATER_OFF: 'HEATER_OFF',
            WAITING_FOR_COMPRESSOR: 'WAITING_FOR_COMPRESSOR'
        };

        this.$scope = $scope;

        this.statusWithSymbols = new Set(['COOLER_ON', 'COOLER_OFF', 'HEATER_ON', 'HEATER_OFF']);

        this.batches = {};
        this.currentBatch = null;

        this.range = {
            type: 'recent',
            name: 'Last Day',
            from: null,
            to: null
        };
        this.supportedRanges = [
            {type: 'recent', name: 'Last Hour'},
            {type: 'day', name: 'Last Day'},
            {type: 'week', name: 'Last Week'},
            {type: 'range', name: 'Date Range'}
        ];

        this.$scope.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2016, 1, 12),
            startingDay: 1
        };

        this.service = DashboardService;

        //this.socket = socket;
    }

    $onInit() {
        this.chartConfig = this.getChartOptions();

/*        this.socket.on('readings:update', (dataPoint) => {
            console.log(dataPoint);
            //check if the timestamp and profile name exists to avoid duplicates.
            this.$scope.data.push(dataPoint);
        });*/

        this.getBatches();
    }

    getBatches() {
        this.service.getBatches().then((batches) => {
            this.batches = batches.map(batch => ({id: batch._id, name: batch._id}));

            if (this.batches.length > 0) {
                this.currentBatch = this.batches[0];
                this.chartConfig.title.text = this.currentBatch.name;
                this.getBatchHistory();
            }
        });
    }

    getBatchHistory() {
        let from = '',
            to = '';
        if (this.range.type === 'range') {
            from = this.formatDate(this.range.from);
            to = (this.range.to) ? this.formatDate(this.range.to, true) : to;
        }
        this.service
            .getHistory(
                this.currentBatch.id,
                this.range.type,
                from,
                to)
            .then(this.handleGeHistorySuccess.bind(this));
    }
    formatDate(date, eod = false) {
        const dt = new Date(date);
        let yy = dt.getFullYear(),
            mm = ('0' + (dt.getMonth() + 1)).slice(-2),
            dd = ('0' + dt.getDate()).slice(-2),
            time = (eod) ? '2359' : '0000';
        return `${yy}${mm}${dd}${time}`;
    }
    handleGeHistorySuccess(response) {
        let dateFix = /\.\d\d\d/,
            dataTemp = {},
            humidity = {data: []},
            history = [];
        response.forEach(dataPoint => {
            if (!dataPoint.humidity && !dataTemp[dataPoint.profile]) {
                dataTemp[dataPoint.profile] = [];
            } else if (!humidity.name) {
                humidity.name = dataPoint.profile;
            }

            if (dataPoint.humidity) {
                humidity.data.push([
                    new Date(dataPoint.time.replace(dateFix, '.000')),
                    dataPoint.value
                ]);
            } else {
                let point = {
                    x: new Date(dataPoint.time).getTime(),
                    y: dataPoint.value
                };
                if (this.statusWithSymbols.has(dataPoint.status)) {
                    point.marker = {
                        symbol: `url(http://local.roverandom.com:8000/assets/images/${dataPoint.status.toLowerCase()}.png)`
                    };
                }
                dataTemp[dataPoint.profile].push(point);
            }
        });

        Object.keys(dataTemp).forEach(key => {
            history.push({
                name: key,
                data: dataTemp[key],
                turboThreshold: 0
            });
        });
        this.chartConfig.series = history;
    }

    changeDateRange() {
        switch (this.range.type) {
            case 'range':
                this.range.from = new Date();
                this.range.to = null;
                break;
            case 'recent': // eslint-disable-line
            case 'day':    // eslint-disable-line
            case 'week':
                this.range.from = null;
                this.range.to = null;
                this.getBatchHistory();
                break;
        }
    }

    getChartOptions() {
        return {

            chart: {
                type: 'spline',
                zoomType: 'x',
                width: 1000
            },
            tooltip: {
                shared: true,
                formatter() {
                    let s = '<b>' + moment(this.x).format('DD/MM/YYYY HH:mm') + '</b>';

                    this.points.forEach((point) => {
                        s += `<br/>${point.series.name}: ${point.y}`;
                    });

                    return s;
                }
            },

            title: {},
            subtitle: {},
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Date'
                },
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                minRange: 1
            },
            yAxis: {
                title: {
                    text: 'Temperature (ºC)'
                },
                min: 0
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            }
        };
    }
}

export default DashboardController;