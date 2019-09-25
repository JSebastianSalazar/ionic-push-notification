import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCM} from '@ionic-native/fcm/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fcm: FCM
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.pushNotification();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    pushNotification() {
        this.fcm.getToken().then(token => {
            console.log(token);
        }).catch(err => {
            console.log(err);
        });
        //escucha los cambios el token es algo propio que lo que es el dispositivo
        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token, 'refresh');
        }, error => {
            console.log(error, 'error refresh');
        });

        //sabe las notificaciones del dispositivos
        this.fcm.onNotification().subscribe(data => {
            console.log(data);
            // si la aplicacion se encuentra en segundo plano o primer plano
            if (data.wasTapped) {
                console.log('segundo plano', JSON.stringify(data));
            } else {
                // ocurre cuando la app se encuentra en primer plano
                console.log('primer plano', JSON.stringify(data));

            }
        }, error => {
            console.log('data err', error);
        });
    }
}
