      // Process Form Submission
      myForm.onsubmit = async (e) => {
        e.preventDefault();
        // Grab Input Value
        userMediaID = e.target[0].value
        //  ---------------------------
        let mediaID = userMediaID
        let response
        let parsedJSON
        let playlistItem
        // Media API
        let mediaEndpoint = `https://cdn.jwplayer.com/v2/media/${mediaID}`

        // GET REQUEST FOR MEDIA
        async function fetchMediaEndpoint() {
          response = await fetch(mediaEndpoint)
          parsedJSON = await response.json()
          console.log(parsedJSON, 'media Object')

          let htmlMedia = document.getElementById('media');

          // TODO: loop through playlist
          let myPlaylist = parsedJSON.playlist
          console.log(myPlaylist, 'logging my playlist out')

          let playlistItemsArray = myPlaylist.map((playlistItemData)=>{
            console.log(playlistItemData, 'value is here')
            playlistItem = playlistItemData;
            return playlistItem
          })

          console.log(playlistItemsArray, 'here is the array')

          htmlMedia.innerHTML = `<ul>
                                    <li>Title: ${parsedJSON.title}</li>
                                    <li>Description: ${parsedJSON.description}</li>
                                    <li>Kind: ${parsedJSON.kind}</li>
                                    <li>Playlist: (${playlistItemsArray.length})</li>
                                    <ul>
                                      <li>Title: ${playlistItemsArray[0].title} </li>
                                      <li>Preview Link: ${playlistItemsArray[0].link}</li>
                                      <li>Media ID: ${playlistItemsArray[0].mediaid} </li>
                                      <li>Original Media ID: ${playlistItemsArray[0].original_mediaid}</li>
                                      <li>Publish Date: ${playlistItemsArray.pubdate}</li>
                                    </ul>
                                    <li>Feed Instance ID: ${parsedJSON.feed_instance_id}</li>
                                </ul>
                                `
        };

        // Call API Here
        fetchMediaEndpoint()

      };