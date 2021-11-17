# <u>Installation du socle technique</u>

### <u>Installation de Symfony et bonne pratiques</u>

- ###### Création de la base de donnée avec .env

  Pour ce faire, rendez-vous dans votre .env et tout en bas dans la section *###> doctrine/doctrine-bundle ###* vous allez changer les infos de *DATABASE_URL* par :

  ```
  DATABASE_URL="postgresql://postgres:[votre_mot_de_passe]@127.0.0.1:5432/[le_nom_de_votre_base_de_donnée_que_vous_voulez]?serverVersion=13&charset=utf8"
  ```

  Une fois cela fait vous devez un terminal lancer cette commande pour créer la base de donnée:

  

  ```
  php bin/console doctrine:database:create
  ```

  

- Création d'une entité User

  

  Dans un terminal, placez vous dans la racine de votre projet et taper la commande suivante 

  ```sh
  php bin/console make:User
  ```

  *Ici on va préférer prendre la commande make:User car elle va nous permettre de créer un utilisateur avec un mot de passe, un role, et un identifiant unique etc*

​      Pour la suite de la mise en place du projet il vous faudra ajouter un champs mail pour commencer. C'est avec ce champs qu'on va 	  procéder à la vérification de l'utilisateur.

​	  Pour ce faire vous pouvez utiliser la commande suivante pour ajouter des champs dans l'entité "User":

```bash
php bin/console make:entity User
```



- ###### Seedez la table "User"

  Pour remplir la table *User* on peut utiliser les *fixtures* proposé par Symfony.

  Si vous ne possèdez pas le packages, vous pouvez utiliser cette commande pour l'installer:

  

  ```bash
  composer require doctrine:orm-fixtures
  ```

  Vous pouvez maintenant créer une nouvelle fixtures avec cette commande:

  

  ```sh
  php bin/console make:fixtures UserFixtures
  ```

  

  Une fois cela fait, il y aura un nouveau dossier *Fixtures* qui apparaitra et avec dedans un fichier qui *UserFixtures* dedans vous allez placer ceci:

  

  ```php
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
  ```

  ce bout de code va générer un utilisateur dans votre base de donnée.

  Pour lancer la *Fixtures* vous allez devoir lancer la commande suivante:

  

  ```sh
  php bin/console doctrine:fixtures:load
  ```

  

- ###### Installation de l'authentification des utilisateurs (JWT)

  Pour commencer nous avons besoin d'utiliser le bundle suivant qu'on va devoir installer via un terminal ouvert à la racine du projet

  

  ```sh
  composer require lexik/jwt-authentication-bundle
  ```

  

  ```
  php bin/console lexik:jwt:generate-keypair 
  ```

  

​	  Dans le fichier "config/packages/security.yaml" introduisez ceci pour configurer correctement le firewall et les controls d'accès de 	  symfony.

​	  *Symfony supérieur à 5.3*

```yaml
security:
    enable_authenticator_manager: true
    # ...
    
    firewalls:
        login:
            pattern: ^/api/login
            stateless: true
            json_login:
                check_path: /api/login
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure

        api:
            pattern:   ^/api
            stateless: true
            jwt: ~

    access_control:
        - { path: ^/api/login, roles: PUBLIC_ACCESS }
        - { path: ^/api,       roles: PUBLIC_ACCESS }
```

​	  Symfony inférieur à 5.3*

```yaml
security:
    # ...
    
    firewalls:
        login:
            pattern: ^/api/login
            stateless: true
            json_login:
                check_path: /api/login # or api_login_check as defined in config/routes.yaml
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure

        api:
            pattern:   ^/api
            stateless: true
            guard:
                authenticators:
                    - lexik_jwt_authentication.jwt_token_authenticator

    access_control:
        - { path: ^/api/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/api,       roles: IS_AUTHENTICATED_ANONYMOUSLY }

```

​	  Dans le même fichier vous allez si ce n'est pas déjà le cas remplacer dans la section *providers:* remplacer *property: uuid* par 	 		*property: email*

​	  Il faut par la suite indiquer une route pour faire vérifier les identifiants de l'utilisateur, pour ce faire on peut lui indiquer une route 	 	  dans le fichier *config/routes.yaml* et lui indiquer ceci:

```yaml
api_login:
  path: /api/login
```



### <u>Installation de PostgreSQL</u>

Commencer l'installation de PostgreSQL en cliquant sur le lien ci-dessous

[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

*Note: les identifiants par défaut sont user: postgres et le mot de passe et celui que vous avez utilisé lors de l'installation de PostgreSQL*

Une fois l'installation terminée, un serveur devrait normalement ce lancer en tache de fond avec les donnée suivante:

```
url: http://127.0.0.1:5432
user: postgres
mdp: [votre_mot_de_passe]
```



### <u>Installation de React</u>

### <u>Installation de Mercure</u>

