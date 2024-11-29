import { writeToExcel } from "../../support/writeToExcel";
class OrgPage {

    peopleTab() {
        return cy.get('.org-page-navigation__items li').eq(5)
    }
    filterTab() {
        return cy.get('#people-search-keywords')
    }
    peopleProfileCard() {
        return cy.get('.artdeco-card.org-people-profile-card__card-spacing.org-people__card-margin-bottom')
    }
    listProfileLink() {
        //return cy.get('div[class="org-people-profile-card__profile-info"] div div:nth-child(2) a[href*="https://www.linkedin"]')
        //return cy.get('div.scaffold-finite-scroll__content>ul>li>div>section>div>div>div:nth-child(2)>div[class="artdeco-entity-lockup__title ember-view"]>div')
        return cy.get('div.scaffold-finite-scroll__content>ul>li>div>section>div>div>div:nth-child(2)>div[class="artdeco-entity-lockup__title ember-view"]>a')
    }
    spinner() {
        return cy.get('span[class="artdeco-loader__bars"]')
    }
    waitSpinnerToDisapear() {
        this.spinner().then(($spinner) => {
            if ($spinner.is(':visible')) {
                cy.wrap($spinner).should('not.exist');
            }
        });
    }

    getProfileLinkAndStoreINExcel() {
        const textList = [];
        cy.scrollTo('bottom');
        cy.wait(2000)
        this.listProfileLink().each(($el) => {
            cy.wrap($el)
                .scrollIntoView()
                .should('be.visible')
                .invoke('attr', 'href')
                .then((text) => {
                    const trimmedText = text.trim();
                    if (trimmedText) {
                        textList.push(trimmedText);
                    }

                });
        }).then(() => {
            const filePath = 'cypress/downloads/listData.xlsx';
            writeToExcel(textList, filePath);
        });
    }

    // getAllProfileLinkAndStoreInExcel() {
    //     const textList = [];

    //     // Function to collect profile links
    //     const collectProfiles = () => {
    //         return this.listProfileLink().each(($el) => {
    //             cy.wrap($el)
    //                 .scrollIntoView()
    //                 .should('be.visible')
    //                 .invoke('text')
    //                 .then((text) => {
    //                     const trimmedText = text.trim();
    //                     if (trimmedText) {
    //                         textList.push(trimmedText);
    //                     }
    //                 });
    //         });
    //     };

    //     const scrollAndCollect = () => {
    //         let previousLength = 0;
    //         let currentLength = 0;

    //         return new Cypress.Promise((resolve) => {
    //             do {
    //                 // Scroll to the bottom and wait for content to load
    //                 cy.scrollTo('bottom').wait(2000).then(() => {
    //                     // Collect profiles after scrolling
    //                     collectProfiles().then(() => {
    //                         currentLength = textList.length;
    //                     });
    //                 });
    //                 previousLength = currentLength;
    //             } while (currentLength > previousLength);

    //             resolve();
    //         });
    //     };

    //     // Start the collection process
    //     scrollAndCollect().then(() => {
    //         const filePath = 'cypress/downloads/listData.xlsx';
    //         writeToExcel(textList, filePath); // Write the collected text to Excel
    //     });
    // }
    // getAllProfileLinkAndStoreINExcel() {
    //     const textSet = new Set();

    //     const scrollAndCollectText = (timeout = 10000) => {
    //         let previousLength = 0;
    //         const endTime = Date.now() + timeout;

    //         const collectText = () => {
    //             // Get the list of profile links
    //             this.listProfileLink().then(($elements) => {
    //                 const currentLength = $elements.length;

    //                 // Collect text from current elements
    //                 $elements.each((index, el) => {
    //                     const text = Cypress.$(el).invoke('attr', 'href').trim();
    //                     if (text) {
    //                         textSet.add(text);
    //                     }
    //                 });

    //                 // If new elements were found, scroll again
    //                 if (currentLength > previousLength) {
    //                     previousLength = currentLength;

    //                     // Scroll down
    //                     cy.scrollTo('bottom');
    //                     cy.wait(1000); // Wait for new elements to load
    //                     collectText(); // Recursively call to collect more text
    //                 } else {
    //                     // No new elements found; finish and write to Excel
    //                     cy.log('No new elements loaded, stopping collection');
    //                     const filePath = 'cypress/downloads/listData.xlsx';
    //                     const textArray = Array.from(textSet);  // Convert Set to Array
    //                     writeToExcel(textArray, filePath);
    //                 }
    //             });
    //         };

    //         collectText(); // Initial call to start collecting text
    //     };

    //     scrollAndCollectText(); // Start the scrolling and collecting process
    // }
    getAllProfileLinkAndStoreINExcel() {
        const textSet = new Set();

        const scrollAndCollectText = (timeout = 10000) => {
            let previousLength = 0;
            const endTime = Date.now() + timeout;

            const collectText = () => {
                this.listProfileLink().then(($elements) => {
                    const currentLength = $elements.length;
                    $elements.each((index, el) => {
                        cy.wrap(el).invoke('attr', 'href').then((href) => {
                            const text = href?.trim();
                            if (text) {
                                textSet.add(text);
                            }
                        });
                    });

                    // If new elements were found, scroll again
                    if (currentLength > previousLength) {
                        previousLength = currentLength;

                        // Scroll down
                        cy.scrollTo('bottom');
                        cy.wait(1000);
                        collectText(); // Recursively call to collect more text
                    } else {
                        // No new elements found; finish and write to Excel
                        cy.log('No new elements loaded, stopping collection');
                        const filePath = 'cypress/downloads/listData.xlsx';
                        const textArray = Array.from(textSet);  // Convert Set to Array
                        writeToExcel(textArray, filePath);
                    }
                });
            };

            collectText(); // Initial call to start collecting text
        };

        scrollAndCollectText(); // Start the scrolling and collecting process
    }

}
export default OrgPage