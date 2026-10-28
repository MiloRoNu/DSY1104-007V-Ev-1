import { Row, Col, Card } from 'react-bootstrap'

const productos = [
  { id: 1, nombre: 'Consola X', descripcion: 'Descripción breve del producto.', precio: '$299.990' },
  { id: 2, nombre: 'Consola Y', descripcion: 'Descripción breve del producto.', precio: '$399.990' },
  { id: 3, nombre: 'Consola Z', descripcion: 'Descripción breve del producto.', precio: '$499.990' }
]

// Row y Col son la grilla de Bootstrap: en celular (xs) cada tarjeta usa
// todo el ancho, y desde tablet (md) se ponen 3 por fila. Eso la hace responsiva.
function NewProduct() {
  return (
    <section className="productos">
      <h2>Productos</h2>
      <Row className="g-3">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} md={4}>
            <Card className="news-card h-100">
              <Card.Body>
                <Card.Title as="h3">{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text as="h4">{producto.precio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default ProductCards
