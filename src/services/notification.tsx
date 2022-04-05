// import PushNotification from "react-native-push-notification";
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface onRegister {
//     os?: string,
//     token: string
// }

// const NotificationHandler = (queryClient: any, key: string) => {
//     PushNotification.configure({
//         // (optional) Called when Token is generated (iOS and Android)
//         onRegister: function (res: onRegister) {
//             AsyncStorage.setItem("fcm_token", res.token)
//             console.log(res.token);
//         },

//         // (required) Called when a remote is received or opened, or local notification is opened
//         onNotification: function (notification: any) {
//             // console.log("NOTIFICATION:", notification);
//             // PushNotification.localNotification({
//             //     title: notification.title,
//             //     message: notification.message,
//             //     priority: "high"
//             // })
//             queryClient.prefetchQuery(["queque", key]);
//         },
//         onAction: function (notification: any) {
//             console.log("ACTION:", notification.action);
//             console.log("NOTIFICATION:", notification);
//         },
//         onRegistrationError: function (err: any) {
//             console.error(err.message, err);
//         },
//         permissions: {
//             alert: true,
//             badge: true,
//             sound: true,
//         },
//         popInitialNotification: true,
//         requestPermissions: true,
//     });
// }

// export default NotificationHandler
