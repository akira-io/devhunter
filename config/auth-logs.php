<?php

declare(strict_types=1);

use Akira\LaravelAuthLogs\Listeners\FailedLoginListener;
use Akira\LaravelAuthLogs\Listeners\LoginListener;
use Akira\LaravelAuthLogs\Listeners\LogoutListener;
use Akira\LaravelAuthLogs\Listeners\OtherDeviceLogoutListener;
use Akira\LaravelAuthLogs\Templates\FailedLogin;
use Akira\LaravelAuthLogs\Templates\NewDevice;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\OtherDeviceLogout;

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Logs Table Name
    |--------------------------------------------------------------------------
    |
    | Specify the database table name for storing authentication logs. Customize
    | this value to align with your application's naming conventions.
    |
    */
    'table_name' => 'authentication_logs',

    /*
    |--------------------------------------------------------------------------
    | Notification Date Format
    |--------------------------------------------------------------------------
    |
    | Define the date format for notifications related to authentication events.
    | This format will be applied consistently across notifications.
    |
    */
    'date_format' => 'Y-m-d H:i:s',

    /*
    |--------------------------------------------------------------------------
    | Geolocation API
    |--------------------------------------------------------------------------
    |
    | Define the API endpoint used to fetch geolocation information. Currently,
    | only 'ip-api.com' is supported. Customize this URL as needed.
    |
    */
    'geolocation_api' => 'http://ip-api.com/json',

    /*
    |--------------------------------------------------------------------------
    | Database Connection
    |--------------------------------------------------------------------------
    |
    | Specify the database connection for storing authentication logs. Leave it
    | as 'null' to use the default connection specified in the database config.
    |
    */
    'db_connection' => env('AUTH_LOGS_DB_CONNECTION', env('DB_CONNECTION', 'sqlite')),

    /*
    |--------------------------------------------------------------------------
    | Notification Channels
    |--------------------------------------------------------------------------
    |
    | Define the notification channels for authentication events. The default
    | channel is 'mail'. Add other channels such as 'slack' or 'nexmo' if required.
    |
    */
    'notification_via' => ['mail'],

    /*
    |--------------------------------------------------------------------------
    | Authentication Events to Log
    |--------------------------------------------------------------------------
    |
    | List the authentication events to monitor. Include the event class names
    | to ensure proper logging of these events.
    |
    */
    'events' => [
        'login' => Login::class,
        'failed' => Failed::class,
        'logout' => Logout::class,
        'logout-other-devices' => OtherDeviceLogout::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Event Listeners
    |--------------------------------------------------------------------------
    |
    | Register custom listeners for the specified authentication events. Each
    | listener can handle additional logic when an event occurs.
    |
    */
    'listeners' => [
        'login' => LoginListener::class,
        'failed' => FailedLoginListener::class,
        'logout' => LogoutListener::class,
        'other_device_logout' => OtherDeviceLogoutListener::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Notification Templates
    |--------------------------------------------------------------------------
    |
    | Configure notification templates for authentication events. Enable or disable
    | notifications and specify custom templates for each type of event.
    |
    */
    'templates' => [
        'new_device' => [
            'notification' => env('AUTH_LOGS_NEW_DEVICE_NOTIFICATION', true),
            'template' => NewDevice::class,
        ],
        'failed_login' => [
            'notification' => env('AUTH_LOGS_FAILED_LOGIN_NOTIFICATION', true),
            'template' => FailedLogin::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Log Retention Period
    |--------------------------------------------------------------------------
    |
    | Specify the retention period for authentication logs (in days). Logs older
    | than this period will be purged automatically to optimize database usage.
    |
    */
    'purge' => 365,

];
