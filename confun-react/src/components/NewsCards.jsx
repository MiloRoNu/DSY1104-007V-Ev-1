import { Row, Col, Card } from 'react-bootstrap'

const noticias = [
  { id: 1, titulo: 'Noticia 1', texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, voluptatem dignissimos modi quis assumenda aperiam perferendis impedit autem, deleniti asperiores voluptatibus. Amet distinctio quaerat voluptates suscipit perferendis, laudantium non iure!' },
  { id: 2, titulo: 'Noticia 2', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quo vel. Mollitia architecto tempore veniam illo culpa tenetur quasi repellat harum earum necessitatibus, vero quae maxime ipsam assumenda omnis quo!' },
  { id: 3, titulo: 'Noticia 3', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat beatae voluptates error esse doloribus nostrum nulla laborum expedita sit, sed dolorum maxime quia, iste cupiditate? Placeat temporibus eius cupiditate cumque!' },
]

// Row y Col son la grilla de Bootstrap: en celular (xs) cada tarjeta usa
// todo el ancho, y desde tablet (md) se ponen 3 por fila. Eso la hace responsiva.
function NewsCards() {
  return (
    <section className="noticias">
      <h2>Noticias</h2>
      <Row className="g-3">
        {noticias.map((noticia) => (
          <Col key={noticia.id} xs={12} md={4}>
            <Card className="news-card h-100">
              <Card.Body>
                <Card.Title as="h3">{noticia.titulo}</Card.Title>
                <Card.Text>{noticia.texto}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default NewsCards
