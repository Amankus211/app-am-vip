 const resultsPattern = [
            "SMALL | 0", "BIG | 5", "SMALL | 1", "BIG | 6", "SMALL | 2",
            "SMALL | 3", "BIG | 7", "SMALL | 4", "BIG | 8", "BIG | 9"
        ];

        let currentPeriodIndex = 0;
        let history = [];

        function updatePeriodAndTimer() {
            const now = new Date();
            const seconds = now.getUTCSeconds();
            const remainingSeconds = 60 - (seconds % 60);
            const minutes = now.getUTCMinutes();
            const totalMinutes = now.getUTCHours() * 60 + minutes;

            const periodNumber = `${now.getUTCFullYear()}${(now.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}${now.getUTCDate().toString().padStart(2, "0")}1000${(
                10001 + totalMinutes
            ).toString()}`;

            document.getElementById("period1m").textContent = periodNumber;
            document.getElementById("timer1mi").innerHTML = `<span>Timer:</span> 00:${remainingSeconds
                .toString()
                .padStart(2, "0")}`;

            if (remainingSeconds === 60) {
                displayResult(periodNumber);
            }
        }

        function displayResult(periodNumber) {
            const currentResult = resultsPattern[currentPeriodIndex];
            document.getElementById("resultDisplay").innerHTML = `<span></span> ${currentResult}`;
            history.push({ period: periodNumber, result: currentResult });

            if (history.length > 10) history.shift(); // Keep history to the last 10 entries

            currentPeriodIndex = (currentPeriodIndex + 1) % resultsPattern.length;
        }

        function toggleDrawerMenu() {
            const drawerMenu = document.getElementById("drawerMenu");
            drawerMenu.style.display = drawerMenu.style.display === "block" ? "none" : "block";
        }

        function showHistory() {
            const historyContainer = document.getElementById("historyContainer");
            const historyTableBody = document.getElementById("historyTableBody");
            historyTableBody.innerHTML = "";

            history.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${entry.period}</td><td>${entry.result}</td>`;
                historyTableBody.appendChild(row);
            });

            historyContainer.style.display = "block";
        }

        setInterval(updatePeriodAndTimer, 1000);


