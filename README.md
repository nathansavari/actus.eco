<img src="src/assets/img/icon-128.png" width="64"/>

# Bienvenue

Le but de cette extension Chrome est d'apporter des npuvelles fraiches et de qualité sur l'environnement. Tout se trouve en un seul endroit, à chaque dois que vous ouvrez une nouvelle page sur votre navigateur !

Cette extension à été créé à partir de ce boilerplate : [https://github.com/lxieyang/chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react).

## Installer et lancer

### Procédure:

1. Regarder si votre version [Node.js](https://nodejs.org/) est >= **14**.
2. Cloner ce repo.
3. Lancer `npm install` pour les dépendences.
4. Lancer `npm start`
5. Pour charger votre extension sur Chrome:
   1. Aller sur `chrome://extensions/`
   2. Check `Developer mode`
   3. Cliquer sur `Charger l'extension non empaquetée`
   4. Choisir le dossier `build`.
6. Enjoy !

## Structure

Tout se passe dans le dossier `src`
.

## Aspect technique

### Webpack auto-reload and HRM

Grâce à [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) en environnement dev (avec `npm start`) vous avez une fonction de rechargement automatique qui va recharger le navigateur automatiquement chaque fois que vous enregistrez un fichier dans votre éditeur.

Vous pouvez exécuter le mode dev sur un autre port si vous le souhaitez. Il suffit de spécifier la var env `port` comme ceci :

```
$ PORT=6002 npm run start
```

### Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

### Intelligent Code Completion

Thanks to [@hudidit](https://github.com/lxieyang/chrome-extension-boilerplate-react/issues/4)'s kind suggestions, this boilerplate supports chrome-specific intelligent code completion using [@types/chrome](https://www.npmjs.com/package/@types/chrome).

### Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

### Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

---

Michael Xieyang Liu | [Website](https://lxieyang.github.io)
