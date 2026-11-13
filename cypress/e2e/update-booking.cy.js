/// <reference types="cypress"/>

describe ('Update Booking', () => {

    var token = ''
    var bookingid = '' 

    before ('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username" : "admin",     
	            "password" : "password123"
            }
        }). 
            then((response) => {
                expect(response.status).to.eql(200)
                token = response.body.token
            })
    })

    beforeEach('Create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {     
	            "firstname": "Carla", 
	            "lastname": "Silva",     
	            "totalprice": 1500,     
	            "depositpaid": true,     
	            "bookingdates": {         
		            "checkin": "2026-12-05",         
		            "checkout": "2026-12-12"     
		        },    
	            "additionalneeds": "Breakfast" 
            }
        })
        .then ((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).to.eql(1500)
            bookingid = response.body.bookingid
        })

    })

    it("Update Booking", () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/' + bookingid,
            body: {     
	            "firstname": "Maria", 
	            "lastname": "Gomes",     
	            "totalprice": 2500,     
	            "depositpaid": true,     
	            "bookingdates": {         
		            "checkin": "2026-12-05",         
		            "checkout": "2026-12-12"     
		        },    
	            "additionalneeds": "Breakfast" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
                //'Cookie': 'token=' + token
            }
        })
        .then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.totalprice).to.eql(2500)
        })

    })

    it("Update Booking without token", () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false, 
            body: {     
	            "firstname": "Lucas", 
	            "lastname": "Gomes",     
	            "totalprice": 5000,     
	            "depositpaid": true,     
	            "bookingdates": {         
		            "checkin": "2026-12-05",         
		            "checkout": "2026-12-12"     
		        },    
	            "additionalneeds": "Breakfast" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + token 
            }
        })

    })

    it("Update Booking invalid token", () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false, 
            body: {     
	            "firstname": "Lucas", 
	            "lastname": "Gomes",     
	            "totalprice": 5000,     
	            "depositpaid": true,     
	            "bookingdates": {         
		            "checkin": "2026-12-05",         
		            "checkout": "2026-12-12"     
		        },    
	            "additionalneeds": "Breakfast" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=123456'
            }
        })

    })
})