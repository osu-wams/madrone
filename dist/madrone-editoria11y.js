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
  }

  Ed11y.M.devLink = {
    title: 'URL is hard linking to Development site',
    tip: (href) => `
        <p>The URL for this link is using a full URL to the Development Site, Relative links should be used.</p>
        <p>The specified URL is:<br>
            <em>${Ed11y.sanitizeForHTML(href)}</em>
        </p>
        ${getPathFromUrl(href)}
    `,
  }

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
  }

  Ed11y.M.missingHeadingLevel1 = {
    title: 'Missing Heading Level 1',
    tip: () => `
        <p>You goober, you didn't add a heading level.
         </p>
    `,
  }

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
    })
  });

  Ed11y.elements.devLinks?.forEach((el) => {
    Ed11y.results.push({
      element: el,
      test: 'devLink',
      content: Ed11y.M.devLink.tip(el.getAttribute('href')),
      position: 'beforebegin',
      dismissalKey: false,
    })
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
    })
  });

  if (Ed11y.elements.headingLevel1.length === 0) {
    Ed11y.results.push({
      element: document.querySelector("main"),
      test: 'missingHeadingLevel1',
      content: Ed11y.M.missingHeadingLevel1.tip(),
      position: 'afterbegin',
      dismissalKey: false,
    })
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
    return `<p>The actual URL may be:<br><em style='word-wrap: break-word;'>${decoded}</em></p>`
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
  return `<p>The relative URL may be:<br><em style='word-wrap: break-word;'>${Ed11y.sanitizeForHTML(pathname)}</em>`
}
