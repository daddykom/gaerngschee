<?php

declare(strict_types=1);

namespace App\Tests;

use App\Application;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;

final class OfferRoutesTest extends TestCase
{
    private function createApp(): \Slim\App
    {
        return Application::create();
    }

    public function testGetOffersReturnsJson(): void
    {
        $app = $this->createApp();
        $request = \Slim\Psr7\Request::create('GET', '/api/offers');
        $response = $app->handle($request);

        $this->assertInstanceOf(ResponseInterface::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
    }

    public function testGetOffersReturnsValidJson(): void
    {
        $app = $this->createApp();
        $request = \Slim\Psr7\Request::create('GET', '/api/offers');
        $response = $app->handle($request);

        $body = (string) $response->getBody();
        $this->assertNotEmpty($body);

        $data = json_decode($body, true);
        $this->assertNull(json_last_error(), 'Response must be valid JSON');
        $this->assertIsArray($data);
    }

    public function testGetOffersReturnsArrayOfOffers(): void
    {
        $app = $this->createApp();
        $request = \Slim\Psr7\Request::create('GET', '/api/offers');
        $response = $app->handle($request);

        $data = json_decode((string) $response->getBody(), true);
        $this->assertContainsOnly('array', $data);
    }
}
