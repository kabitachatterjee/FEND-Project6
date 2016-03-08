/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a URL',function(){
            for (var i = 0; i< allFeeds.length; i++){
               expect(allFeeds[i].url).toBeDefined();
               expect(allFeeds[i].url).not.toBe("");
             }
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a name',function(){
            for (var i = 0; i< allFeeds.length; i++){
               expect(allFeeds[i].name).toBeDefined();
               expect(allFeeds[i].name).not.toBe("");
             }
         });
    });


    /* This is a new test suite named "The menu" which has all tests related
     * to the menu icon and its functionality
     */

        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         describe('The menu', function(){
              

              it('Menu bar is hidden by default',function(){
                 expect($('body').hasClass('menu-hidden')).toBeTruthy();
              });
         
          
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
              it('Menu bar changes visibility on click',function(){
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
         
               });
           });
    /* This is a new test suite named "Initial Entries" containing
     * all tests related to the number of entries in the feed from the API call
     */

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         describe('Initial Entries',function(){

            beforeEach(function(done){
                loadFeed(0,function(){
                    done();
                });
            });
            it('should have  atleast one entry in the feed container',function(done){
                var numEntries = $('.feed .entry').length;
                expect(numEntries).toBeGreaterThan(0);
                done();
            });

         });

    /* This is a new test suite named "New Feed Selection" containing tests
     * to ensure that with each new feed the earlier contents of the feed are
     * changed
     */

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Note: loadFeed() is asynchronous.
         */

         describe('New Feed Selection',function(){
            var currentFeed;
            beforeEach(function(done){
                loadFeed(0,function(){
                currentFeed = $('.feed').html();
                loadFeed(1,function(){
                       done();
                    });
                });
            });
            it('All contents of the feed container should be changed',function(done){
                var newFeed = $('.feed').html();
                expect(currentFeed).not.toBe(newFeed);
                done();
            });
            });
}());
