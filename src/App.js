import readline from "readline";

class App {
  constructor() {
    this.rl = this.createInterface();
  }

  createInterface() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    console.log("숫자 추리 게임을 시작합니다.🥳", "\n");

    this.nm = Math.floor(Math.random() * 100) + 1;
    this.play_time = 1;
    console.log("1부터 100 사이 숫자 중 하나를 골라주세요.🧐");
    this.ask_number();
  }

  ask_number() {
    this.rl.on("line", (answer) => {
      const N = Number(answer);
      if (!isNaN(N) || N > 0 || N < 101 || N == "y" || N == "n") {
        this.answer_check(answer);
      } else {
        console.log(
          "값이 유효하지 않습니다.😣다시 한 번 확인해주세요.🙄",
          "\n"
        );
        console.log("1부터 100 사이 숫자 중 하나를 골라주세요.🧐");
      }
    });
  }
  answer_check(answer) {
    if (answer > this.nm) {
      console.log(`[3/${this.play_time}] 더 낮습니다.👎`, "\n");
      this.check_play();
    } else if (answer < this.nm) {
      console.log(`[3/${this.play_time}] 더 높습니다.👍`, "\n");
      this.check_play();
    } else if (answer == this.nm) {
      this.play_time = 0;
      console.log("정답입니다!😍", "\n");
      this.restart_game();
    }
  }

  check_play() {
    if (this.play_time >= 3) {
      this.play_time = 0;
      console.log("주어진 기회를 모두 소진하였습니다.😭");
      this.restart_game();
    } else {
      console.log("1부터 100 사이 숫자 중 하나를 골라주세요.🧐");
      this.play_time += 1;
    }
  }

  restart_game() {
    console.log("게임을 다시 시작하겠습니까?😇 (예: y, 아니오: n)");

    this.rl.on("line", (answer) => {
      if (answer.toLowerCase() == "y") {
        this.rl.close();
        const newRl = this.createInterface();
        this.rl = newRl;
        console.log("\n");
        this.start();
      } else if (answer.toLowerCase() == "n") {
        console.log("게임을 종료합니다.🏁\n다음에 또 만나요👋");
        this.rl.close();
      } else {
        console.log("y 혹은 n을 입력해주세요🥺");
      }
    });
  }
}

export default App;
