// الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // دالة لتحميل المهام من Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // استرجاع المهام
        storedTasks.forEach(taskText => addTask(taskText, false)); // إضافة المهام إلى الصفحة
    }

    // دالة لإضافة المهمة
    function addTask(taskText, save = true) {
        // إنشاء عنصر li جديد للمهمة
        const li = document.createElement('li');
        li.textContent = taskText;

        // إنشاء زر الحذف
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // إضافة حدث للحذف
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li); // إزالة المهمة من DOM

            // تحديث المهام في Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText); // إزالة المهمة من المصفوفة
            localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // تحديث Local Storage
        });

        // إضافة الزر داخل li
        li.appendChild(removeButton);
        
        // إضافة li إلى taskList
        taskList.appendChild(li);

        // حفظ المهمة في Local Storage إذا كانت القيمة save = true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText); // إضافة المهمة للمصفوفة
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // تحديث Local Storage
        }

        // مسح حقل الإدخال بعد إضافة المهمة
        taskInput.value = "";
    }

    // إضافة مستمع حدث للزر "Add Task"
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // أخذ النص المدخل
        if (taskText === "") {
            alert("Please enter a task.");
            return; // إذا كانت القيمة فارغة، يظهر تنبيه
        }
        addTask(taskText); // إضافة المهمة
    });

    // إضافة مستمع حدث للمفتاح "Enter" لإضافة المهمة
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim(); // أخذ النص المدخل
            if (taskText === "") {
                alert("Please enter a task.");
                return; // إذا كانت القيمة فارغة، يظهر تنبيه
            }
            addTask(taskText); // إضافة المهمة
        }
    });

    // تحميل المهام من Local Storage عند تحميل الصفحة
    loadTasks();
});
