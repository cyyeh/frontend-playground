const url = 'http://localhost:5173'

describe('production plan', () => {
  beforeEach(() => {
    cy.visit(url)
    cy.fixture('example').then((data) => {
      this.data = data

      cy.findByLabelText('demand').click().clear().type(`${this.data.demand}`)
      cy.findByLabelText('price').click().clear().type(`${this.data.price}`)
  
      this.data.producers.forEach(producer => {
        cy.findByTestId(producer.id).findByLabelText('cost').click().clear().type(`${producer.cost}`)
        cy.findByTestId(producer.id).findByLabelText('production').click().clear().type(`${producer.production}`)
      })
    })
  })

  it('correctly show revenue', () => {
    this.data.producers.forEach(producer => {
      cy.findByTestId(producer.id).findAllByTestId('revenue').should('have.text', `${producer.cost * producer.production}`)
    })
  })

  it('correctly show total profit', () => {
    cy.findByTestId('profit').should('have.text', `${this.data.profit}`)
  })

  it('correctly show shortfall', () => {
    cy.findByTestId('shortfall').should('have.text', `${this.data.shortfall}`)
  })
})
