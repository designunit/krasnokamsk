# [Краснокамск](https://krasnokamsk.unit4.io)

## Readymag post export

1. Add favicon

jjjj

Remove this line in `/readymag/index.html` in head section:

```html
<link rel="icon" href="dist/img/favicons/favicon.ico" type="image/x-icon"/>
```

Add this to `/readymag/index.html` instead:

```html
<link rel="icon" href="/missing-by-readymag/favicon.png" type="image/x-icon" />
```

Put the image in `/readymag/missing-by-readymag/favicon.png`. That's it

