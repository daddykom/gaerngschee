<?php

declare(strict_types=1);

namespace App\Data;

use PDO;

final class OfferRepository
{
    private PDO $pdo;

    public function __construct(?PDO $pdo = null)
    {
        $this->pdo = $pdo ?? Database::getConnection();
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query('SELECT * FROM offers ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();
        return array_map(fn($row) => $this->transformToApiFormat($row), $rows);
    }

    public function findById(string $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM offers WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch();
        return $result ? $this->transformToApiFormat($result) : null;
    }

    public function findByStatus(string $status): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM offers WHERE status = :status ORDER BY created_at DESC');
        $stmt->execute(['status' => $status]);
        $rows = $stmt->fetchAll();
        return array_map(fn($row) => $this->transformToApiFormat($row), $rows);
    }

    private function transformToApiFormat(array $row): array
    {
        return [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'category' => $row['category'],
            'location' => [
                'address' => $row['address'] ?? '',
                'latitude' => (float) ($row['latitude'] ?? 0),
                'longitude' => (float) ($row['longitude'] ?? 0),
            ],
            'status' => $row['status'],
            'createdAt' => $row['created_at'],
            'updatedAt' => $row['updated_at'],
            'contact' => [
                'name' => $row['contact_name'] ?? '',
                'email' => $row['contact_email'] ?: null,
                'phone' => $row['contact_phone'] ?: null,
            ],
            'imageUrl' => $row['image_url'] ?? null,
        ];
    }
}