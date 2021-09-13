
# GridNavWrapper

GridNavWrapper est une custom element HTML afin de pouvoir disposer un nouveau element html.
Il est utilisé afin de le placer comme le wrapper d'un nav contenant des ul et des li.

## Auteur

- [@jean Simondon](https://github.com/Jean-Simondon)

## FAQ

Voir dans Index.html pour un exemple d'utilisation
Le dépôt est immédiatement téléchargeable est utilisable en ouvrant index.html dans un navigateur
En cas d'ajout à un projet, il faut ajouter manuellement le css et le js à vos assets et exporter le js sous la forme d'un module et l'enregister avec le code suivant :

import { GridNavWrapper } from './GridNavWrapper.js';
customElements.define('gridnav-wrapper', GridNavWrapper);

Crédit à grafikart qui en partageant son code source du site grafikart.fr (contenant de nombreux custom element) m'a fait découvert cette techno
