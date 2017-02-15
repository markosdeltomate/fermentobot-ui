export default function cacheInterceptor($cacheFactory) {
    let cache = $cacheFactory.get('resourceCache');
    if (!cache) {
        cache = $cacheFactory('resourceCache');
    }
    return {
        response: (response) => {
            let id = response.data._id;

            if (response.config.method === 'PUT' || response.config.method === 'DELETE') {
                if (!id && response.config.method === 'DELETE') {
                    id = response.config.url.split('/').pop();
                }
                let url = response.config.url.replace(id, '');
                cache.remove(url);
            }
            cache.remove(response.config.url);
            return response;
        }
    };
}
