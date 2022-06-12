class PlayerML {
  constructor(namaPlayer){
    this.nama = namaPlayer
  }

  nama = ''
  nyawa = 100
  hidup = true
  kekuatan = 40 // attack
  perlindungan = 10 // defense, pecahan per seratus 
  
  pukul(playerLain){
    const maxDefense = 120
    let truePower = this.kekuatan * maxDefense/(maxDefense+playerLain.perlindungan)
    truePower = truePower * Math.random()

    playerLain.nyawa = (playerLain.nyawa - truePower).toFixed(2)

    // status pukulan
    console.log(`${this.nama} Memukul ${playerLain.nama} dengan kekuatan ${truePower}`)
    console.log(`Nyawa ${playerLain.nama} menjadi ${playerLain.nyawa}`)

    playerLain.hidup = playerLain.nyawa > 0
  }

  status(){
    let statusHidup = this.hidup ? 'Hidup' : 'Mati'
    console.log(`Status player ${this.nama} [${statusHidup}] : Nyawa ${this.nyawa}, Kekuatan ${this.kekuatan}, Perlindungan ${this.perlindungan}`)
  }
}

let listPlayer = [
  new PlayerML('Nico'),
  new PlayerML('Ilham'),
  new PlayerML('Rio Feriawan'),
  new PlayerML('Dimas'),
  new PlayerML('Yusril'),
  new PlayerML('Hasan'),
  new PlayerML('Admad Dzaky Hafid'),
] // jumlah data : 3

function getRandomPlayer(){
  let indexPlayerRandom = (Math.random() * (listPlayer.length - 1)).toFixed()
  return listPlayer[indexPlayerRandom]
}

function getKorbanPlayer(pemukul){
  let filterTanpaPemukul = listPlayer.filter((v) => v !== pemukul)

  let indexPlayerRandom = (Math.random() * (filterTanpaPemukul.length - 1)).toFixed()
  return filterTanpaPemukul[indexPlayerRandom]
}

function whoIsStillAlive(){
  let alivePlayer = listPlayer.filter((player) => player.hidup)
  return alivePlayer
}

function whoIsWin(){
  let alivePlayer = whoIsStillAlive()
  if(alivePlayer.length === 1){
    return alivePlayer[0]
  }
  return false;
}


let rounde = 1

let intervalFighting = setInterval(() => {
  rounde++
  console.log(`---------- Ronde ${rounde} -----------`)

  let pemukul = getRandomPlayer()
  console.log(`Pemukul adalah ${pemukul.nama}`)
  
  let korban = getKorbanPlayer(pemukul)
  console.log(`Korban adalah ${korban.nama}`)
  
  setTimeout(() => {
    pemukul.pukul(korban)
    korban.status()

    if(whoIsWin()){
      let winner = whoIsWin()
      console.log(`Pemenangnya adalah ${winner.nama}`)
      clearInterval(intervalFighting)
    }
  }, 2000)
}, 5000)

console.log('List player')
listPlayer.forEach((player) => {
  player.status()
})

console.log('LETTS GOOOOO')