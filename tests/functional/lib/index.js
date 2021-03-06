/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'intern/chai!assert',
  'require'
], function (intern, registerSuite, assert, require) {
  'use strict';

  var url = intern.config.siteRoot;

  registerSuite({
    name: 'index',

    'front page loads': function () {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('#maintitle h1').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Bug reporting\nfor the internet.');
        })
        .end();
    },

    'logging in on the homepage': function() {
      return this.remote
        .setFindTimeout(intern.config.wc.pageLoadTimeout)
        .get(require.toUrl(url))
        .findByCssSelector('.nav__section--right .nav__link').click()
        .end()
        .findByCssSelector('#login_field').click()
        .type(intern.config.wc.user)
        .end()
        .findByCssSelector('#password').click()
        .type(intern.config.wc.pw)
        .end()
        .findByCssSelector('input[type=submit]').submit()
        .end()
        .findByCssSelector('button').submit()
        .end()
        .findByCssSelector('.nav__section--right .nav__link').getVisibleText()
        .then(function (text) {
          assert.equal(text, "Logout");
        })
        .end()
    },

    'reporter addon link is shown': function () {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('.nav__link').getVisibleText()
        .then(function (text) {
          assert.include(text, 'Download our Firefox');
        })
        .end();
    },

    'form toggles open then closed': function () {
      return this.remote
        .setFindTimeout(intern.config.wc.pageLoadTimeout)
        .get(require.toUrl(url))
        .findByCssSelector('#report-bug.closed').click()
        .end()
        .findByCssSelector('.form-opened')
        .end()
        .findByCssSelector('#report-bug.opened').click()
        .end()
        .findByCssSelector('.form-closed').isDisplayed()
        .then(function (isDisplayed) {
          assert.equal(isDisplayed, false);
        });
    },

    'browse issues (my issues)': function() {
      return this.remote
        .setFindTimeout(intern.config.wc.pageLoadTimeout)
        .get(require.toUrl(url))
        .findByCssSelector('.nav__section--right .nav__link').click()
        .end()
        .findByCssSelector('#my-issues h3').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Submitted by Me');
        })
        .end()
    },

    'browse issues (needs diagnosis)': function() {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('#needs-diagnosis h3').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Needs Diagnosis');
        })
        .end()
        .findAllByCssSelector('.issues.issue-needs-diagnosis')
        .then(function (elms) {
          assert.equal(elms.length, 4, '4 issues should be displayed');
        })
        .end()
        .findByCssSelector('.issue-needs-diagnosis .issue-number').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s(\d+)$/, 'Issue should have a number');
        })
        .end()
        .findByCssSelector('.issue-needs-diagnosis .issue-title a').getAttribute('href')
        .then(function (text) {
          assert.match(text, /^\/issues\/\d+$/, 'Link should have a number');
        })
        .end()
        .findByCssSelector('.issue-needs-diagnosis .issue-title').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s\d+:\s.+$/, 'Issue should have a non-empty title');
        })
        .end()
        .findByCssSelector('.issue-needs-diagnosis .issue-metadata').getVisibleText()
        .then(function (text) {
          assert.match(text, /comments:\s\d+$/, 'Issue should display number of comments');
          assert.match(text, /^Opened:\s\d{4}\-\d{2}\-\d{2}/, 'Issue should display creation date');
        })
        .end()
    },

    'browse issues (untriaged)': function() {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('#untriaged h3').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Untriaged Issues');
        })
        .end()
        .findAllByCssSelector('.issues.issue-untriaged')
        .then(function (elms) {
          assert.equal(elms.length, 4, '4 issues should be displayed');
        })
        .end()
        .findByCssSelector('.issue-untriaged .issue-number').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s(\d+)$/, 'Issue should have a number');
        })
        .end()
        .findByCssSelector('.issue-untriaged .issue-title a').getAttribute('href')
        .then(function (text) {
          assert.match(text, /^\/issues\/\d+$/, 'Link should have a number');
        })
        .end()
        .findByCssSelector('.issue-untriaged .issue-title').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s\d+:\s.+$/, 'Issue should have a non-empty title');
        })
        .end()
        .findByCssSelector('.issue-untriaged .issue-metadata').getVisibleText()
        .then(function (text) {
          assert.match(text, /comments:\s\d+$/, 'Issue should display number of comments');
          assert.match(text, /^Opened:\s\d{4}\-\d{2}\-\d{2}/, 'Issue should display creation date');
        })
        .end()
    },

    'browse issues (site contacted)': function() {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('#sitewait h3').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Site Contacted');
        })
        .end()
        .findAllByCssSelector('.issues.issue-sitewait')
        .then(function (elms) {
          assert.equal(elms.length, 4, '4 issues should be displayed');
        })
        .end()
        .findByCssSelector('.issue-sitewait .issue-number').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s(\d+)$/, 'Issue should have a number');
        })
        .end()
        .findByCssSelector('.issue-sitewait .issue-title a').getAttribute('href')
        .then(function (text) {
          assert.match(text, /^\/issues\/\d+$/, 'Link should have a number');
        })
        .end()
        .findByCssSelector('.issue-sitewait .issue-title').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s\d+:\s.+$/, 'Issue should have a non-empty title');
        })
        .end()
        .findByCssSelector('.issue-sitewait .issue-metadata').getVisibleText()
        .then(function (text) {
          assert.match(text, /comments:\s\d+$/, 'Issue should display number of comments');
          assert.match(text, /^Opened:\s\d{4}\-\d{2}\-\d{2}/, 'Issue should display creation date');
        })
        .end()
    },

    'browse issues (ready for outreach)': function() {
      return this.remote
        .get(require.toUrl(url))
        .findByCssSelector('#ready-for-outreach h3').getVisibleText()
        .then(function (text) {
          assert.equal(text, 'Ready for Outreach');
        })
        .end()
        .findAllByCssSelector('.issues.issue-contactready')
        .then(function (elms) {
          assert.equal(elms.length, 4, '4 issues should be displayed');
        })
        .end()
        .end()
        .findByCssSelector('.issue-contactready .issue-number').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s(\d+)$/, 'Issue should have a number');
        })
        .end()
        .findByCssSelector('.issue-contactready .issue-title a').getAttribute('href')
        .then(function (text) {
          assert.match(text, /^\/issues\/\d+$/, 'Link should have a number');
        })
        .end()
        .findByCssSelector('.issue-contactready .issue-title').getVisibleText()
        .then(function (text) {
          assert.match(text, /^Issue\s\d+:\s.+$/, 'Issue should have a non-empty title');
        })
        .end()
        .findByCssSelector('.issue-contactready .issue-metadata').getVisibleText()
        .then(function (text) {
          assert.match(text, /comments:\s\d+$/, 'Issue should display number of comments');
          assert.match(text, /^Opened:\s\d{4}\-\d{2}\-\d{2}/, 'Issue should display creation date');
        })
        .end()
    }

  });
});
