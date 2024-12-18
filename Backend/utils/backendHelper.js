exports.extractUsername = (email) => {
  const match = email.match(/^([a-zA-Z0-9._]+)/); // Include '.' in the match
  if (!match) return '';
  return match[1].replace(/\./g, '_').toLowerCase(); // Replace all '.' with '_'
};
