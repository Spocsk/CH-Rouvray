<?php

namespace App\DataFixtures;

use App\Entity\User;
use Cassandra\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setUuid(uniqid());
        $user->setEmail("dylandasilva79@gmail.com");
        $user->setFirstName("Dylan");
        $user->setLastName("COUTO DE OLIVEIRA");
        $user->setRoles(["ROLE_TUTOR"]);
        $user->setPassword($this->passwordHasher->hashPassword($user, "test"));
        $manager->persist($user);
        $manager->flush();
    }
}
