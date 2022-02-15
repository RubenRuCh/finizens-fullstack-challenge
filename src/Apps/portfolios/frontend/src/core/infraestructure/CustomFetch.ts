export const CustomFetch = {
    get: getFetch,
    post: postFetch,
    patch: patchFetch,
    put: putFetch,
    delete: deleteFetch,
    buildEndpoint,
};

function getFetch<T>(url: string): Promise<T> {
    return wrappedFetch(url, { method: 'get' }) as Promise<T>;
}

function postFetch<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return wrappedFetch(url, {
        body,
        method: 'post',
    }) as Promise<T>;
}

function patchFetch<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return wrappedFetch(url, {
        body,
        method: 'patch',
    }) as Promise<T>;
}

function putFetch<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return wrappedFetch(url, {
        body,
        method: 'put',
    }) as Promise<T>;
}

function deleteFetch<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return wrappedFetch(url, {
        body,
        method: 'delete',
    }) as Promise<T>;
}

export async function wrappedFetch<T>(
    url: string,
    {
        method,
        body,
        token,
    }: {
        method: 'post' | 'put' | 'patch' | 'get' | 'delete';
        body?: Record<string, unknown>;
        token?: string;
    },
): Promise<T | void> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');

    if (token) {
        requestHeaders.append('Authorization', `Bearer ${token}`);
    }

    return await fetch(
        url,
        {
            headers: requestHeaders,
            body: JSON.stringify(body),
            method,
        },
    )
        .then(async (response: Response) => {
            const responseBodyFormatted = await response.text();

            if (!responseBodyFormatted) {
                return;
            }

            return JSON.parse(responseBodyFormatted) as T;
        });
}

interface RouteParam {
    key: string;
    value: string;
}

function buildEndpoint(url: string, paramsToReplace: RouteParam[]): string {
    let transformedUrl = url;

    paramsToReplace.forEach(param => {
        transformedUrl = transformedUrl.replace(`:${param.key}`, param.value);
    });

    return transformedUrl;
}
