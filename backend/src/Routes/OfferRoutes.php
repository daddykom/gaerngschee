<?php

declare(strict_types=1);

namespace App\Routes;

use Psr\Http\Message\ResponseInterface;
use Slim\App;
use Slim\Psr7\Response;

final class OfferRoutes
{
    public static function register(App $app): void
    {
        $app->get('/api/offers', function ($request, ResponseInterface $response) {
            $offers = [
                [
                    'id' => '1',
                    'title' => 'Kleidung tauschen',
                    'description' => 'Tausche deine alte Kleidung gegen neue Stücke. Nachhaltig und kostenlos!',
                    'category' => 'Kleidung',
                    'location' => [
                        'lat' => 51.5074,
                        'lng' => -0.1278,
                        'address' => 'Musterstraße 1, 10115 Berlin'
                    ],
                    'status' => 'published',
                    'createdAt' => '2024-01-15T10:00:00Z',
                    'updatedAt' => '2024-01-15T10:00:00Z',
                    'contact' => ['name' => 'Maria Müller'],
                    'imageUrl' => null
                ],
                [
                    'id' => '2',
                    'title' => 'Büchertausch',
                    'description' => 'Gemeinsames Tauschen von Büchern.',
                    'category' => 'Bücher',
                    'location' => [
                        'lat' => 52.5200,
                        'lng' => 13.4050,
                        'address' => 'Lesecafé, Hauptstraße 5, 10115 Berlin'
                    ],
                    'status' => 'published',
                    'createdAt' => '2024-01-10T14:30:00Z',
                    'updatedAt' => '2024-01-10T14:30:00Z',
                    'contact' => ['name' => 'Thomas Schmidt', 'email' => 'thomas@buecherfreunde.de'],
                    'imageUrl' => null
                ],
                [
                    'id' => '3',
                    'title' => 'Spieleabend',
                    'description' => 'Kostenloser Spieleabend für alle.',
                    'category' => 'Aktivitäten',
                    'location' => [
                        'lat' => 52.5300,
                        'lng' => 13.4100,
                        'address' => 'Jugendzentrum, Nebenstraße 3, 10115 Berlin'
                    ],
                    'status' => 'published',
                    'createdAt' => '2024-01-12T18:00:00Z',
                    'updatedAt' => '2024-01-12T18:00:00Z',
                    'contact' => ['name' => 'Jugendzentrum Team', 'phone' => '+49 30 12345678'],
                    'imageUrl' => null
                ]
            ];

            $body = json_encode($offers, JSON_THROW_ON_ERROR);
            $response->getBody()->write($body);
            return $response
                ->withHeader('Content-Type', 'application/json');
        });

        $app->get('/api/offers/{id}', function ($request, ResponseInterface $response, array $args) {
            $id = $args['id'];
            $offers = [
                '1' => [
                    'id' => '1',
                    'title' => 'Kleidung tauschen',
                    'description' => 'Tausche deine alte Kleidung.',
                    'category' => 'Kleidung',
                    'location' => ['lat' => 51.5074, 'lng' => -0.1278],
                    'status' => 'published',
                    'createdAt' => '2024-01-15T10:00:00Z',
                    'updatedAt' => '2024-01-15T10:00:00Z',
                    'contact' => ['name' => 'Maria Müller'],
                    'imageUrl' => null
                ]
            ];

            if (!isset($offers[$id])) {
                $body = json_encode(['error' => 'Offer not found']);
                $response->getBody()->write($body);
                return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
            }

            $body = json_encode($offers[$id]);
            $response->getBody()->write($body);
            return $response
                ->withHeader('Content-Type', 'application/json');
        });
    }
}