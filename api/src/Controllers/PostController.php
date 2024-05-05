<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Managers\PostManager;
use DateTimeImmutable;
use PDOException;

class PostController 
{
    private $postManager;

    public function __construct()
    {
        $this->postManager = new PostManager('posts');
    }

    public function update()
    {

        $now = new DateTimeImmutable('now', new \DateTimeZone('Europe/Paris'));
        $createdAt = $now->format('Y-m-d H:i:s');

        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'] ;
        $content = $data['content'];
        $userId = $data['userId'] ;
        $postId = $data['postId'] ;

        $tabDatas = [
            "title" => $title,
            "content" =>  $content,
            "createdAt" => $createdAt,
            "userId" => $userId,
            "id" => $postId
        ];
        http_response_code(200);
        return json_encode($this->postManager->update($tabDatas));
    }

    public function show(string $id)
    {
  
        http_response_code(200);
        return json_encode($this->postManager->findById($id));
    }

    public function new()
    {

        $now = new DateTimeImmutable('now', new \DateTimeZone('Europe/Paris'));
        // Formatage de la date en format SQL
        $createdAt = $now->format('Y-m-d H:i:s');

        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'] ;
        $content = $data['content'];
        $userId = $data['userId'] ;

        $tabDatas = [
            "title" => $title,
            "content" =>  $content,
            "createdAt" => $createdAt,
            "userId" => $userId
        ];

        http_response_code(200);
        return json_encode($this->postManager->insertPost($tabDatas));
    }

    public function all()
    {

        try {
            http_response_code(200);
            return json_encode($this->postManager->findAllPostWithComments());
		} catch (PDOException $exception) {
            return json_encode([
                "status" => http_response_code(404),
                "eroor-message" => $exception->getMessage()
            ]);
		}
    }

    public function remove(string $id)
    {
  
        http_response_code(200);
        return json_encode($this->postManager->deletePost($id));
    }
}