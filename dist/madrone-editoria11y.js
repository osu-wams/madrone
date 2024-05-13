// @phpcs:ignoreFile
const currentHostName = window.location.origin;
document.addEventListener('ed11yRunCustomTests', () => {
  // 1. Write your custom test.
  // This can be anything you want.
  //
  // This example uses Ed11y.findElements(),
  // which respects checkRoots and ignoreElements,
  // to find links with a particular string in their URL.
  Ed11y.findElements('safeLinks', 'a[href*="safelinks.protection.outlook.com/?"]');

  // Hard Dev links should be avoided.
  Ed11y.findElements('devLinks', 'a[href*="dev.oregonstate.edu"]');

  // Full Links to site
  Ed11y.findElements('sameSiteFullLinks', `a[href*="${currentHostName}"]`);

  // Check to ensure there's at least 1 heading level that is not hidden
  Ed11y.findElements('headingLevel1', 'h1:not([class*="hidden"])');

  // 2. Create a message for your tooltip.
  // You'll need a title and some contents,
  // as a value for the key you create for your test.
  //
  // Be sure to use the same key as the test name below.
  Ed11y.M.outlookSafeLink = {
    title: 'URL is Safe Link encoded',
    tip: (href) => `
        <p>The URL for this link has been copied from an email. It includes the original recipient's email address,
        and will bounce all clicks through the Outlook Safelinks server.
         </p>
        <p>The specified URL is:<br>
            <em style='word-break: break-all;font-size:90%;line-height: 1.2;display: block;'>
                ${Ed11y.sanitizeForHTML(href)}
            </em>
        </p>
        ${decodeSafelink(href)}
    `,
  };

  Ed11y.M.devLink = {
    title: 'URL is hard linking to Development site',
    tip: (href) => `
        <p>The URL for this link is using a full URL to the Development Site, Relative links should be used.</p>
        <p>The specified URL is:<br>
            <em>${Ed11y.sanitizeForHTML(href)}</em>
        </p>
        ${getPathFromUrl(href)}
    `,
  };

  Ed11y.M.sameSiteFullLink = {
    title: 'Manual Check: did you mean to use a full link?',
    tip: (href) => `
        <p>Using a Fully Qualified Domain Name when linking internally is discouraged.</p>
        <p>The specified URL is:<br/>
            <em>${Ed11y.sanitizeForHTML(href)}</em>
        </p>
        <p>Generally when linking to pages/files within the same site it is best to use the tools provided in the
           content editor to generate links correctly.</p>
        ${getPathFromUrl(href)}
    `,
  };

  Ed11y.M.missingHeadingLevel1 = {
    title: 'Missing Heading Level 1',
    tip: () => `
<p>It seems you've not added a level 1 heading(h1) on your page. The Page Title typically serves as the level 1 heading.</p>
<p>If you've chosen to hide the Page Title, please ensure to add the <em>Title</em> block in Layout Builder. To add the Title block to your page in Layout Builder:
<ol>
<li>Filter by block name <em>Title</em></li>
<li>Set label to <em>- Hidden -</em></li>
<li>Change the Formatter to <em>Text field formatter</em></li>
<li>Set the Field wrapper to <em>H1</em></li>
<li>Add/adjust your spacing as needed.</li>
</ol>
If the Page Title does not serve your needs for a level 1 heading, please ensure that you have a custom one created in the Text Editor.
</p>
<p>Remember, having one level 1 heading is important for good SEO practices, accessibility, and content organization.</p>
    `,
  };

  Ed11y.M.multipleHeadingLevel1 = {
    title: 'Multiple Heading Level 1',
    tip: () => `
<p>You have <strong>multiple level 1 headings(h1)</strong> on your page. Typically, your page title is the level 1 heading of a page. You need to change the other level 1 headings to heading 2. You can learn more about heading structure for webpages on the <a href="https://drupal.oregonstate.edu/site-building-guide/elements">Site Building Guide</a> or <a href ="https://accessibility.oregonstate.edu/headings">the Accessibility website.</a></p>
<p>This can cause confusion for your site visitors, particularly for those using assistive technologies like screen readers. The  level 1 heading is denote what your entire webpage is about.</p>
<p>Multiple level 1 headings can dilute SEO value and cause confusion for search engines trying to understand the content of your page. It can also make the structure of your content less clear for users.</p>
<p>Providing one clear, descriptive level 1 heading helps to improve your site's accessibility, SEO ranking, and usability. Please ensure there is only one heading level 1 on the page.</p>
    `,
  };

  // 3. Push each item you want flagged to Ed11y.results.
  //
  // You must provide:
  //   el: The element
  //   test: A key for your test
  //   content: The tip you created above.
  //   position: "beforebegin" for images and links,
  //             "afterbegin" for paragraphs.
  //   dismissalKey: false for errors,
  //             a unique string for manual checks.
  Ed11y.elements.safeLinks?.forEach((el) => {
    Ed11y.results.push({
      element: el,
      test: 'outlookSafeLink',
      content: Ed11y.M.outlookSafeLink.tip(el.getAttribute('href')),
      position: 'beforebegin',
      dismissalKey: false,
    });
  });

  Ed11y.elements.devLinks?.forEach((el) => {
    Ed11y.results.push({
      element: el,
      test: 'devLink',
      content: Ed11y.M.devLink.tip(el.getAttribute('href')),
      position: 'beforebegin',
      dismissalKey: false,
    });
  });

  Ed11y.elements.sameSiteFullLinks?.forEach((el) => {
    let sameSiteHref = el.getAttribute('href');
    let dismissKey = Ed11y.dismissalKey(sameSiteHref);
    Ed11y.results.push({
      element: el,
      test: 'sameSiteFullLink',
      content: Ed11y.M.sameSiteFullLink.tip(sameSiteHref),
      position: 'beforebegin',
      dismissalKey: dismissKey,
    });
  });
  // Adds logic to ensure that we don't have a theme level h1 set.
  let siteBrandingLinkHasH1 = document.querySelector('#block-madrone-sitebranding .block__content__site-name a:has(h1)');
  let containsSiteFrontClass = siteBrandingLinkHasH1 && siteBrandingLinkHasH1.classList.contains('site-name__site-front');
  let containsGroupFrontClass = siteBrandingLinkHasH1 && siteBrandingLinkHasH1.classList.contains('site-name__group-front');
  if (Ed11y.elements.headingLevel1.length === 0 && !(siteBrandingLinkHasH1 && (containsSiteFrontClass || containsGroupFrontClass))) {
    Ed11y.results.push({
      element: document.querySelector('main'),
      test: 'missingHeadingLevel1',
      content: Ed11y.M.missingHeadingLevel1.tip(),
      position: 'afterbegin',
      dismissalKey: false,
    });
  }
  // Base conditions.
  let hasMoreThanOneH1 = Ed11y.elements.headingLevel1.length > 1;
  let hasAtLeastOneH1 = Ed11y.elements.headingLevel1.length >= 1;
  let siteBrandingLinkHasClass = containsSiteFrontClass || containsGroupFrontClass;

  // Combine conditions
  let hasExtraH1 = hasAtLeastOneH1 && siteBrandingLinkHasH1 && siteBrandingLinkHasClass;
  if (hasMoreThanOneH1 || hasExtraH1) {
    Ed11y.elements.headingLevel1.forEach(el => {
      Ed11y.results.push({
        element: el,
        test: 'multipleHeadingLevel1',
        content: Ed11y.M.multipleHeadingLevel1.tip(),
        position: 'beforebegin',
        dismissalKey: false,
      });
    });
  }

  // 4. When you are done with all your custom tests,
  // dispatch an "ed11yResume" event:
  let allDone = new CustomEvent('ed11yResume');
  document.dispatchEvent(allDone);
});

/**
 * Decodes a Safelink URL and returns the actual URL.
 *
 * @param {string} url - The Safelink URL to decode.
 * @returns {string} - The actual URL, formatted as an HTML paragraph.
 *                    If the Safelink URL does not contain a 'url' parameter, an empty string is returned.
 */
function decodeSafelink(url) {
  const params = new URL(url).searchParams;
  let decoded = params.get('url');
  if (!!decoded) {
    decoded = Ed11y.sanitizeForHTML(decoded);
    return `<p>The actual URL may be:<br><em style='word-wrap: break-word;'>${decoded}</em></p>`;
  }
  return '';
}

/**
 * Takes a full URL link and returns the relative URL as a string.
 *
 * @param {string} url - The developer link URL to decode.
 * @return {string} - The decoded relative URL.
 */
function getPathFromUrl(url) {
  const pathname = new URL(url).pathname;
  return `<p>The relative URL may be:<br><em style='word-wrap: break-word;'>${Ed11y.sanitizeForHTML(pathname)}</em>`;
}
