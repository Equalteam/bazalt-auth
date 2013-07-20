<?php

require '../vendor/autoload.php';

use Whoops\Handler\PrettyPageHandler;
use Whoops\Handler\JsonResponseHandler;

$run     = new Whoops\Run;
$handler = new PrettyPageHandler;
$run->pushHandler($handler);

$jsonHandler = new JsonResponseHandler();
$jsonHandler->onlyForAjaxRequests(true);
$run->pushHandler($jsonHandler);

$run->pushHandler(
    function ($exception, $inspector, $whoops) {

        // Set response code
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
        // Log error
        /*
            $exception->getMessage(),
            array(
                'File' => $exception->getFile(),
                'Line' => $exception->getLine()
            )*/
    }
);
$run->register();

date_default_timezone_set('Europe/Kiev');

$connectionString = new \Bazalt\ORM\Adapter\Mysql([
    'server' => '127.0.0.1',
    'port' => '3306',
    'database' => 'production_news',
    'username' => 'root',
    'password' => 'awdawd'
]);
\Bazalt\ORM\Connection\Manager::add($connectionString, 'default');

\Bazalt\Session::setTimeout(30 * 24 * 60 * 60);

class Blog implements \Bazalt\Auth\Acl\Container
{
    const ACL_CAN_WRITE_BLOG = 1;

    public function getAclLevels()
    {
        return [
            'can_write_blog' => self::ACL_CAN_WRITE_BLOG
        ];
    }
}

\Bazalt\Auth::registerContainers([
    'blog' => new Blog()
]);