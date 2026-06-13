<?php

declare(strict_types=1);

namespace App\Routes;

use Psr\Http\Message\ResponseInterface;
use Slim\App;
use Slim\Psr7\Response;

final class OfferRoutes
{
    private const DATA_FILE = __DIR__ . '/../Data/offers.json';

    public static function register(App $app): void
    {
        $app->get('/api/offers', function ($request, ResponseInterface $response) {
            $json = file_get_contents(self::DATA_FILE);
            $offers = json_decode($json, true, 512, JSON_THROW_ON_ERROR);

            $body = json_encode($offers, JSON_THROW_ON_ERROR);
            $response->getBody()->write($body);
            return $response
                ->withHeader('Content-Type', 'application/json');
        });
    }
}