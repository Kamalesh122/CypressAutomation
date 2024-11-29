describe('Filtering Test Jobs', function () {
    it('Test Job Count', function () {
        cy.visit('https://www.wissen.com/')
        cy.get('p.nav-paragraph')
            .contains('Careers')
            .trigger('mouseover')
        cy.get('#w-dropdown-list-4').contains('Opportunities at Wissen Technology').click()
        cy.get('h3.section-heading').contains('Job vacancies').scrollIntoView()
        // To get the count of Job Vacancies
        cy.get('div.w-embed.w-script li.rec-job-title').its('length').then((count) => {
            cy.log(`Count of Job vacancies: ${count}`)
        })
        let count = 0;
        //To get the count of Test Job vacancies
        cy.get('div.w-embed.w-script li.rec-job-title').each(($el) => {
            if ($el.text().includes('Test') || $el.text().includes('QA') || $el.text().includes('test')) {
                count++;
            }
        }).then(() => {
            cy.log(`Count of elements containing "Test" or "QA": ${count}`);
        });

    })
})