# [Yedi Hu | Personal Page](https://potatobearp.github.io/)

This is a conventional static academic website built with HTML, CSS, and a small amount of JavaScript.
It reproduces the former Hugo Blox design without requiring Hugo, Go, Node.js, or a generated `public/`
directory.

## Local preview

From the repository root:

```shell
python -m http.server 8000
```

Then open <http://127.0.0.1:8000/>.

## Site structure

- `index.html` is the homepage.
- `site-assets/` contains the versioned shared CSS and JavaScript.
- `publication/`, `technical-report/`, `project/`, and `experience/` contain stable static routes.
- `site-assets/media/` contains the existing images, audio, and data used by the pages.
- `uploads/` contains the resume, paper, poster, and slides.

GitHub Pages publishes these static files directly. The project has no Hugo source or generated
`public/` directory.
