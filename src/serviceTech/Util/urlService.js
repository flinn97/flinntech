class UrlService{
    isLikelyUrl(url) {

        // Check for common domain suffixes or the presence of "http(s)://" or "mailto:" at the start
      
        return /\.(com|net|org|io|gov|edu|co)\b/.test(url) || /^(?:f|ht)tps?\:\/\//.test(url) || /^mailto\:/i.test(url);
      
      }
    
            checkURLforString(s){
                let href = window.location.href;
                return href.includes(s);
            }
    
           getIdFromURL(hyphen, index){
            let href = window.location.href;
            let splitURL = href.split("/");
            let id = splitURL[splitURL.length - 1];
            let idList = hyphen? id.split("-") :[id];
            let campId = index? idList[index]:idList[0];
            return campId;
           }
           
           getTypeFromURL(){
            let href = window.location.href;
            let splitURL = href.split("/");
            let type = splitURL[splitURL.length - 2];
            return type

           }
    
          
           convertStringToLink = (string) => {
            if (string) {
              if (!string.startsWith('http://') && !string.startsWith('https://')) {
                return 'https://' + string;
              } else {
                return string;
              }
            }
            return string;
          }
}
export default new UrlService();