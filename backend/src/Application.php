<?php

declare(strict_types=1);

namespace App;

use App\Routes\OfferRoutes;
use Psr\Http\Message\ResponseInterface;
use Slim\App;
use Slim\Factory\AppFactory;

final class Application
{
    public static function create(): App
    {
        $app = AppFactory::create();

        $app->addRoutingMiddleware();

        $app->add(function ($request, $handler): ResponseInterface {
            $response = $handler->handle($request);
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withHeader('Access-Control-Allow-Origin', '*');
        });

        $app->get('/', function ($request, ResponseInterface $response) {
            $response->getBody()->write(json_encode(['message' => 'Gaerngschee API']));
            return $response->withHeader('Content-Type', 'application/json');
        });

        OfferRoutes::register($app);

        return $app;
    }
}