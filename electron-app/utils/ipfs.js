async function pushFile(filepath) {
    // UPLOAD file to the IPFS
    const fileAdded = await this.ipfsw.uploadFile(filepath)

    // APPEND information to Algorand
    await this.algow.appendFileInfo(fileAdded)

    console.log('Finished pushing file')
  }

  async function pullFile(filepath) {
    const filename = path.basename(filepath)

    // GET info from Algorand (try 3 times)
    let retries = 3
    let fileInfo = null
    do {
      if (retries !== 3 && !fileInfo) {
        console.log(`Couldn't find ${filename} information, trying again in 5 sec`)
        await sleep(5000)
      }
      fileInfo = await this.algow.searchFileInfo(filename)
    } while (retries-- > 0 && !fileInfo)

    // RETRIEVE file contents
    await this.ipfsw.downloadFile(fileInfo)

    console.log('Finished pulling file')
  }