import { wait } from '@testing-library/user-event/dist/types/utils'

describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Matti Luukkainen logged in')
    })


  })

  describe('When logged in', function () {
    beforeEach(function () {

      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Mustafi',
        author: 'Mustafa Tuna',
        url: 'https://arsenal.com/',
      })
      cy.createBlog({
        title: 'Mustafi Two',
        author: 'Mustafa Tuna',
        url: 'https://arsenal.com/',
      })
      cy.createBlog({
        title: 'Mustafi Three',
        author: 'Mustafa Tuna',
        url: 'https://arsenal.com/',
      })
      cy.createBlog({
        title: 'Mustafi Four',
        author: 'Mustafa Tuna',
        url: 'https://arsenal.com/',
      })

      cy.createBlog({
        title: 'Mustafi Five',
        author: 'Mustafa Tuna',
        url: 'https://arsenal.com/',
      })
    })
    it('a blog can be created', function () {
      cy.contains('Mustafi Two')
    })
    it('a blog can be liked', function () {
      cy.contains('Mustafi Two').parent().find('button').click()
      cy.get('#like').click()
      cy.get('.blog').eq(0).should('contain', 'Mustafi Two')
    })
    it('a blog can be deleted', function () {
      cy.contains('Mustafi Four').parent().find('button').click()
      cy.get('#delete').click()
      cy.get('html').should('not.contain', 'third blog')
    })
    it('the blogs are sorted in descending  like order', async function () {
      cy.contains('Mustafi Two').parent().find('button').click()

      cy.get('#like').click().wait(1000)
      cy.get('.blog').eq(0).should('contain', 'Mustafi Two')

      cy.contains('Mustafi Five').parent().find('button').click()
      cy.get('#like').click().wait(1000).click().wait(1000)
      cy.get('.blog').eq(0).should('contain', 'Mustafi Five')
      cy.get('.blog').eq(1).should('contain', 'Mustafi Five')
    })
  })
})