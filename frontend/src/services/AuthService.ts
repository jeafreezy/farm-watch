import { ApiInstance, APIRoutes, BASE_URL } from './common';

export class AuthService {
    osmAuthUrl = `${process.env.REACT_APP_OSM_AUTH_URL}?response_type=code&scope=read_prefs&client_id=${process.env.REACT_APP_OSM_OAUTH2_CLIENT_ID}&state=${process.env.REACT_APP_OSM_AUTH_STATE}&redirect_uri=${process.env.REACT_APP_OSM_REDIRECT_URI}`;
    //code from https://github.com/jeafreezy/tasking-manager/blob/develop/frontend/src/utils/login.js
    createPopUp(url: string): Window {
        const width = 500;
        const height = 630;
        const settings = [
            ['width', width],
            ['height', height],
            ['left', window.innerWidth / 2 - width / 2],
            ['top', window.innerHeight / 2 - height / 2],
        ]
            .map((x) => x.join('='))
            .join(',');

        const popup = window.open(url, '_blank', settings);

        if (!popup) return window;
        return popup;
    }
    async getUserDetails(code: string | null, state: string | null) {
        if (code && state && state === process.env.REACT_APP_OSM_AUTH_STATE) {
            try {
                const res = await ApiInstance.post(
                    `${BASE_URL}${APIRoutes.LOGIN}`,
                    {
                        code: code,
                        state: state,
                        service: 'osm',
                    }
                );
                return {
                    data: res.data,
                    status: 200,
                    message: 'Login successfully',
                };
            } catch (error: any) {
                return {
                    data: null,
                    status: 400,
                    message: error.response.data.detail.error_description,
                };
            }
        } else {
            return {
                data: null,
                status: 400,
                message: 'Invalid token',
            };
        }
    }
    async login() {
        const popup = this.createPopUp(this.osmAuthUrl);
        const AuthWindow = setInterval(async () => {
            const url = new URL(popup.window.location.href).searchParams;
            const state = url.get('state');
            const code = url.get('code');
            if (state && code) {
                popup.opener.location.href = `/?${url}`;
                popup.close();
            }
            popup.close();
            clearInterval(AuthWindow);
            if (!popup || !popup.closed) return;
        }, 1000);
    }
}
