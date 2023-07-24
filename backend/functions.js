/* remove accents in string */
function removeAccents(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function regexReplace(query) {
    return query
            .replace(/a/g, '[a,à,á,â,ä,æ,ã,å,ā,ą,ă,A,À,Á,Â,Ä,Æ,Ã,Å,Ā,Ą,Ă]')
            .replace(/A/g, '[A,À,Á,Â,Ä,Æ,Ã,Å,Ā,Ă,Ą,a,à,á,â,ä,æ,ã,å,ā,ą,ă]')
            .replace(/e/g, '[e,è,é,ê,ë,ē,ė,ę,ě,E,È,É,Ê,Ë,Ē,Ė,Ę,Ě]')
            .replace(/E/g, '[E,È,É,Ê,Ë,Ē,Ė,Ę,Ě,e,è,é,ê,ë,ē,ė,ę,ě]')
            .replace(/i/g, '[i,î,ï,í,ī,į,ì,ı,I,Î,Ï,Í,Ī,Į,Ì,İ]')
            .replace(/I/g, '[I,Î,Ï,Í,Ī,Į,Ì,İ,i,î,ï,í,ī,į,ì,ı]')
            .replace(/o/g, '[o,ô,ö,ò,ó,œ,ø,ō,õ,ơ,O,Ô,Ö,Ò,Ó,Œ,Ø,Ō,Õ,Ơ]')
            .replace(/O/g, '[O,Ô,Ö,Ò,Ó,Œ,Ø,Ō,Õ,Ơ,o,ô,ö,ò,ó,œ,ø,ō,õ,ơ]')
            .replace(/u/g, '[u,û,ü,ù,ú,ū,ŭ,ư,U,Û,Ü,Ù,Ú,Ū,Ŭ,Ư]')
            .replace(/U/g, '[U,Û,Ü,Ù,Ú,Ū,Ŭ,Ư,u,û,ü,ù,ú,ū,ŭ,ư]')
            .replace(/-/g, '[-, ]')
            .replace(/ /g, '[ ,-]')
            .replace(/\'/g, '[\',]')
            .replace(/`/g, '[`,\',]')
            .replace(/ae/g, '[ae,æ,Æ]')
            .replace(/AE/g, '[ae,æ,Æ]')
            .replace(/oe/g, '[oe,œ,Œ]')
            .replace(/OE/g, '[oe,œ,Œ]')
            .replace(/c/g, '[c,ç,ć,č,C,Ç,Ć,Č]')
            .replace(/C/g, '[C,Ç,Ć,Č,c,ç,ć,č]')
            .replace(/l/g, '[l,ł,L,Ł]')
            .replace(/L/g, '[L,Ł,l,ł]')
            .replace(/n/g, '[n,ñ,ń,ň,N,Ñ,Ń,Ň]')
            .replace(/N/g, '[N,Ñ,Ń,Ň,n,ñ,ń,ň]')
            .replace(/s/g, '[s,ß,ś,š,ș,ş,S,Ś,Š,Ș,Ş]')
            .replace(/S/g, '[S,Ś,Š,Ș,Ş,s,ß,ś,š,ș,ş]')
            .replace(/y/g, '[y,ÿ,ý,Y,Ÿ,Ý]')
            .replace(/Y/g, '[Y,Ÿ,Ý,y,ÿ,ý]')
            .replace(/z/g, '[z,ž,ź,ż,Z,Ž,Ź,Ż]')
            .replace(/Z/g, '[Z,Ž,Ź,Ż,z,ž,ź,ż]')
            .replace(/h/g, '[h,ḥ,H,Ḥ]')
            .replace(/H/g, '[H,Ḥ,h,ḥ]')
            .replace(/D/g, '[D,Ḑ,Ḍ,Ð,Đ,d,ḑ,ḍ,ð,đ]')
            .replace(/d/g, '[d,ḑ,ḍ,ð,đ,D,Ḑ,Ḍ,Ð,Đ]')
            .replace(/G/g, '[G,Ğ,g,ğ]')
            .replace(/g/g, '[g,ğ,G,Ğ]')
            .replace(/H/g, '[H,Ḥ,h,ḥ]')
            .replace(/h/g, '[h,ḥ,H,Ḥ]') 
            .replace(/T/g, '[T,Ţ,Ṭ,t,ţ,ṭ]')
            .replace(/t/g, '[t,ţ,ṭ,T,Ţ,Ṭ]')
            .replace(/r/g, '[r,R,ř,Ř]')
            .replace(/R/g, '[r,R,ř,Ř]')
   }

module.exports = { removeAccents };