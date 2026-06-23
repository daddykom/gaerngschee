<?php

declare(strict_types=1);

namespace App\Tests;

use App\Application;
use App\Data\Database;
use PDO;
use PDOStatement;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Factory\RequestFactory;

final class OfferRoutesTest extends TestCase
{
    private function createApp(): \Slim\App
    {
        return Application::create();
    }

    private function createRequest(string $method, string $uri): \Slim\Psr7\Request
    {
        return (new RequestFactory())->createRequest($method, $uri);
    }

    protected function setUp(): void
    {
        parent::setUp();

        $mockPdo = $this->createMock(PDO::class);
        $mockStmt = $this->createMock(PDOStatement::class);

        $mockStmt->method('fetchAll')->willReturn([
            [
                'id' => '1',
                'title' => 'Test Offer',
                'description' => 'A test offer',
                'category' => 'food',
                'address' => '123 Test St',
                'latitude' => 52.52,
                'longitude' => 13.405,
                'status' => 'published',
                'created_at' => '2024-01-01 12:00:00',
                'updated_at' => '2024-01-01 12:00:00',
                'contact_name' => 'John Doe',
                'contact_email' => 'john@example.com',
                'contact_phone' => '+1234567890',
                'image_url' => null,
            ],
        ]);

        $mockPdo->method('query')->willReturn($mockStmt);

        $reflection = new \ReflectionClass(Database::class);
        $property = $reflection->getProperty('pdo');
        $property->setAccessible(true);
        $property->setValue(null, $mockPdo);
    }

    public function testGetOffersReturnsJson(): void
    {
        $app = $this->createApp();
        $request = $this->createRequest('GET', '/api/offers');
        $response = $app->handle($request);

        $this->assertInstanceOf(ResponseInterface::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
    }

    public function testGetOffersReturnsValidJson(): void
    {
        $app = $this->createApp();
        $request = $this->createRequest('GET', '/api/offers');
        $response = $app->handle($request);

        $body = (string) $response->getBody();
        $this->assertNotEmpty($body);

        $data = json_decode($body, true);
        $this->assertEquals(JSON_ERROR_NONE, json_last_error(), 'Response must be valid JSON');
        $this->assertIsArray($data);
    }

    public function testGetOffersReturnsArrayOfOffers(): void
    {
        $app = $this->createApp();
        $request = $this->createRequest('GET', '/api/offers');
        $response = $app->handle($request);

        $data = json_decode((string) $response->getBody(), true);
        $this->assertContainsOnly('array', $data);
    }
}
