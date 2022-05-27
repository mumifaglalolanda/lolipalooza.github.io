---
layout: post
title:  "Hola soy Sloth y estoy usando el internuts lololol ekiz de"
date:   2022-05-26 18:13:33 -0400
categories: kek jekyll espanish
tags: kek jekyll espanish
author: sloth
---
Usted encontrará este artículo en el directorio `_posts`. Adelante, editelo y
re-compile el sitio para ver sus cambios. Usted puede re-compilar el sitio de
diferentes maneras, pero la más común es ejecutando `jekyll serve`, el cual
inicia un servidor web y regenera el sitio cuando un archivo es actualizado.

Para crear artículos nuevos, simplemente agregue un archivo en el directorio
`_posts` de manera que siga esta convención `YYYY-MM-DD-nombre-del-artículo.ext`
e incluya la información necesaria en el _front matter_. Déle un vistazo al
código fuente para este artículo para tener una idea de cómo funciona.

Jekyll también ofrece soporte para _snippets_ de código:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

{% highlight javascript %}
$(document).ready(function () {
  $('.lol-button').on('click', function(e) {
    e.preventDefault()
    alert('hola soy sloth y estoy programando lolololol ekiz dé')
  })
})
{% endhighlight %}

{% highlight php %}
<?php foreach ($usuarios as $usuario): ?>
  <?php if ($usuario->name == "sloth"): ?>
    <div><strong>Sloth:</strong> Todos te odian php, pero yo te quiero.</div>
  <?php endif ?>
<?php endforeach ?>
{% endhighlight %}

Revise la [documentación de Jekyll][jekyll-docs] para mayor información sobre
como sacar el máximo provecho de Jekyll. Reporte todos los _bugs_ a [Jekyll en
GitHub][jekyll-gh]. Si tiene preguntas, puede discutirlas en [Jekyll
Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/