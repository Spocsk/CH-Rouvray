<?php


namespace App\DataPersister;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserDataPersister implements \ApiPlatform\Core\DataPersister\DataPersisterInterface
{

    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $userPasswordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    /**
     * @inheritDoc
     */
    public function supports($data): bool
    {
        // TODO: Implement supports() method.

        return $data instanceof User;
    }

    /**
     * @param User $data
     */
    public function persist($data)
    {
        if ($data->getPassword()) {
            $data->setPassword(
                $this->userPasswordHasher->hashPassword($data, $data->getPassword())
            );
            $data->eraseCredentials();
        }
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }

    /**
     * @inheritDoc
     */
    public function remove($data)
    {
        // TODO: Implement remove() method.
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}