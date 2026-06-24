// ===============================
// SCHOOL SERVER MYSTERY
// MAIN GAME SCRIPT
// ===============================

const screen = document.getElementById("screen");

let userInput = "";
let failedAttempts = 0;

let suspectInput = "";
let suspectFailedAttempts = 0;

const CORRECT_PASSWORD = "1024";
const SUSPECT_CODE = "11";

// ===============================
// เริ่มเกม
// ===============================

createLockScreen();

// ===============================
// หน้าปลดล็อกระบบ
// ===============================

function createLockScreen(){

    userInput = "";

    screen.innerHTML = `

    <h1>
    🚨 WARNING: SYSTEM LOCKED
    </h1>

    <div class="display">
        [ ENTER CODE ]
    </div>

    <div class="keypad" id="keypad"></div>

    <div style="text-align:center;">
        <button onclick="showHint()">
            💡 REQUEST HINT
        </button>
    </div>

    `;

    createPasswordKeypad();
}

// ===============================
// คำใบ้
// ===============================

function showHint(){

    alert(
`รหัสผ่าน 4 หลักนี้ซ่อนอยู่ในวิชาคอมพิวเตอร์

จำนวนเมกะไบต์ (MB)

ที่มีค่าเท่ากับ

1 กิกะไบต์ (GB)

ตามระบบเลขฐานสอง`
    );
}

// ===============================
// แป้นตัวเลขปลดล็อก
// ===============================

function createPasswordKeypad(){

    const keypad = document.getElementById("keypad");

    const buttons = [

        "1","2","3",
        "4","5","6",
        "7","8","9",
        "Clear","0","Enter"

    ];

    buttons.forEach(btn => {

        const button = document.createElement("button");

        button.textContent = btn;

        if(btn==="Enter"){
            button.classList.add("enter-btn");
        }

        if(btn==="Clear"){
            button.classList.add("clear-btn");
        }

        button.onclick = () => pressKey(btn);

        keypad.appendChild(button);

    });

}

// ===============================
// กดปุ่มปลดล็อก
// ===============================

function pressKey(key){

    if(key==="Clear"){

        userInput="";

        updateDisplay("[ ENTER CODE ]");

        return;
    }

    if(key==="Enter"){

        if(userInput===CORRECT_PASSWORD){

            alert(
                "ACCESS GRANTED\n\nFETCHING SERVER LOGS..."
            );

            createServerLogScreen();

        }else{

            failedAttempts++;

            const remain = 3 - failedAttempts;

            if(remain>0){

                alert(
                    "ACCESS DENIED\n\nเหลืออีก "
                    + remain +
                    " ครั้ง"
                );

                userInput="";

                updateDisplay("[ INVALID ]");

            }else{

                alert(
                    "SECURITY BREACH DETECTED\n\nSYSTEM DESTROYED"
                );

                location.reload();
            }

        }

        return;
    }

    if(userInput.length<8){

        userInput += key;

        updateDisplay("*".repeat(userInput.length));
    }

}

// ===============================
// อัปเดตจอ
// ===============================

function updateDisplay(text){

    document.querySelector(".display").innerHTML = text;

}
// ===============================
// SERVER LOG SCREEN
// ===============================

function createServerLogScreen(){

    suspectInput = "";

    screen.innerHTML = `

    <h1>📡 CENTRAL SCHOOL SERVER DATABASE</h1>

    <div class="log">

================================================================================

TIMESTAMP | LOCATION | KEYCARD

================================================================================

07:45:12 | Main Gate | ID 0101

07:50:44 | Main Gate | ID 1001

08:15:30 | Science Lab | ID 1011

09:30:11 | Library | ID 0101

10:22:15 | Academic Office | Officer

11:45:00 | Art Studio | ID 1111

12:05:23 | Cafeteria | ID 1001

13:10:55 | Chemistry Room | ID 1011

14:15:02 | Language Lab | ID 0101

15:03:41 | Gymnasium | ID 1011

15:42:19 | Art Studio | ID 1111

15:58:50 | Main Gate | ID 1001

================================================================================

    </div>

    <h2>🕵️ INVESTIGATION MODULE</h2>

    <p>
    ระบุรหัสคีย์การ์ดผู้ต้องสงสัย
    </p>

    <div class="display" id="suspectDisplay">
        [ ENTER ID ]
    </div>

    <div class="keypad" id="suspectKeypad"></div>

    <div style="text-align:center;margin-top:20px;">
        <button onclick="resetGame()">
            🔒 LOGOUT SYSTEM
        </button>
    </div>

    `;

    createSuspectKeypad();
}

// ===============================
// แป้นตัวเลขผู้ต้องสงสัย
// ===============================

function createSuspectKeypad(){

    const keypad =
        document.getElementById("suspectKeypad");

    const buttons = [

        "1","2","3",
        "4","5","6",
        "7","8","9",
        "Clear","0","Search"

    ];

    buttons.forEach(btn=>{

        const button =
            document.createElement("button");

        button.textContent = btn;

        if(btn==="Search"){
            button.classList.add("enter-btn");
        }

        if(btn==="Clear"){
            button.classList.add("clear-btn");
        }

        button.onclick =
            ()=>pressSuspectKey(btn);

        keypad.appendChild(button);

    });

}

// ===============================
// กดปุ่มผู้ต้องสงสัย
// ===============================

function pressSuspectKey(key){

    if(key==="Clear"){

        suspectInput = "";

        updateSuspectDisplay(
            "[ ENTER ID ]"
        );

        return;
    }

    if(key==="Search"){

        checkSuspectCode();

        return;
    }

    if(suspectInput.length < 2){

        suspectInput += key;

        updateSuspectDisplay(
            suspectInput
        );
    }

}

// ===============================
// อัปเดตจอรหัสผู้ต้องสงสัย
// ===============================

function updateSuspectDisplay(text){

    document.getElementById(
        "suspectDisplay"
    ).innerHTML = text;

}

// ===============================
// ตรวจรหัสผู้ต้องสงสัย
// ===============================

function checkSuspectCode(){

    if(suspectInput === SUSPECT_CODE){

        showDossierScreen();

    }else{

        suspectFailedAttempts++;

        if(
            suspectFailedAttempts === 1
        ){

            alert(
`⚠️ ACCESS VIOLATION

รหัสผู้ต้องสงสัยไม่ถูกต้อง

หากใส่ผิดอีก 1 ครั้ง

ระบบจะทำลายตัวเองทันที`
            );

            suspectInput = "";

            updateSuspectDisplay(
                "[ ENTER ID ]"
            );

        }else{

            alert(
`💥 SYSTEM SELF-DESTRUCT

SECURITY BREACH DETECTED

SERVER DESTROYED`
            );

            location.reload();

        }

    }

}

// ===============================
// ออกจากระบบ
// ===============================

function resetGame(){

    failedAttempts = 0;

    suspectFailedAttempts = 0;

    createLockScreen();

}
// ===============================
// DOSSIER SCREEN
// ===============================

function showDossierScreen(){

    screen.innerHTML = `

    <h2>
        ⚠️ CRITICAL DISCOVERY
    </h2>

    <div class="dossier">

        <img
            src="student_danai.png"
            alt="Danai"
            onerror="this.src='https://via.placeholder.com/280x350?text=STUDENT+PHOTO'"
        >

        <div class="dossier-info">

            <h3>
                นายดนัย
            </h3>

            <p>
                ชมรมคอมพิวเตอร์ / แฮกเกอร์
            </p>

            <hr>

            <p>
                <strong>
                รหัสคีย์การ์ด:
                </strong>
                11
            </p>

            <p>
                <strong>
                เครื่องดื่มแก้วโปรด:
                </strong>
                โคล่า
            </p>

            <p>
                <strong>
                เบอร์รองเท้าจริง:
                </strong>
                40
            </p>

            <hr>

            <p>

            มีความแค้นกับ อารยา
            ประธานนักเรียน

            เนื่องจากถูกจับได้ว่า
            แฮกแก้เกรด

            ดนัยจึงพยายามโยนความผิด
            ให้บุคคลอื่น

            </p>

            <p>

            หลักฐานสำคัญคือ

            Server Log

            ที่บันทึกการใช้คีย์การ์ด

            หมายเลข 11

            บริเวณโรงยิม

            เวลา 15:03 น.

            </p>

        </div>

    </div>

    `;

    startCountdown();

}

// ===============================
// TIMER
// ===============================

function startCountdown(){

    setTimeout(()=>{

        triggerHackedEvent();

    },20000);

}
// ===============================
// HACKED EVENT
// ===============================

function triggerHackedEvent(){

    // เล่นเสียงไซเรน
    const siren =
        document.getElementById(
            "sirenAudio"
        );

    if(siren){

        siren.currentTime = 0;

        siren.play().catch(()=>{});

    }

    // จอดำทันที

    screen.innerHTML = `
    
    <div style="
        text-align:center;
        color:red;
        margin-top:100px;
    ">

        <h1>
            SYSTEM BREACH DETECTED
        </h1>

    </div>

    `;

    setTimeout(()=>{

        alert(
`🚨 ALERT 🚨

ตรวจพบการบุกรุกจากภายนอก

ID11 - DANAI

กำลังทำการ FORCE OVERRIDE

ข้อมูลทั้งหมดถูกลบสำเร็จ`
        );

        triggerMatrixCrash();

    },1500);

}

// ===============================
// MATRIX EFFECT
// ===============================

function triggerMatrixCrash(){

    const siren =
        document.getElementById(
            "sirenAudio"
        );

    if(siren){

        siren.pause();

    }

    screen.innerHTML = `

    <div
        class="matrix"
        id="matrixOutput"
    >
    </div>

    `;

    const lines = [

"⚠️ OVERRIDE CRITICAL: SYSTEM INTRUSION DETECTED...",

"CONNECTING FROM SUITE_ROOM_COMPUTER_11... CONNECTED.",

"WIPING EVIDENCE: TARGET_DANAI_RECORD_ID11...",

"100% DELETED!",

"ERASING GYMNASIUM LOG DATA (15:03)...",

"SUCCESS!",

"01001001 01000100 00110001 00110001",

"01001000 01000001 01000011 01001011",

"01000101 01000100",

"ALL DIGITAL EVIDENCE DESTROYED.",

"SERVER TERMINATED BY DANAI."

    ];

    const output =
        document.getElementById(
            "matrixOutput"
        );

    let lineIndex = 0;

    function typeLine(){

        if(lineIndex >= lines.length){

            showFinalScreen();

            return;
        }

        let current =
            lines[lineIndex];

        let charIndex = 0;

        const lineDiv =
            document.createElement(
                "div"
            );

        output.appendChild(
            lineDiv
        );

        const typing =
            setInterval(()=>{

                lineDiv.textContent =
                    current.substring(
                        0,
                        charIndex
                    );

                charIndex++;

                if(
                    charIndex >
                    current.length
                ){

                    clearInterval(
                        typing
                    );

                    lineIndex++;

                    setTimeout(
                        typeLine,
                        400
                    );

                }

            },20);

    }

    typeLine();

}

// ===============================
// FINAL SCREEN
// ===============================

function showFinalScreen(){

    screen.innerHTML = `

    <div style="
        text-align:center;
        margin-top:80px;
    ">

        <h1 style="
            color:red;
            font-size:48px;
        ">
            ❌
        </h1>

        <h1 style="
            color:red;
        ">
            SYSTEM DESTROYED
        </h1>

        <p style="
            margin-top:30px;
            color:#00ff66;
            font-size:20px;
        ">
            หลักฐานทั้งหมดถูกลบโดยแฮกเกอร์
        </p>

        <br><br>

    </div>

    `;

}
