// الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // دالة لإضافة المهمة
    function addTask() {
        const taskText = taskInput.value.trim(); // أخذ النص المدخل

        if (taskText === "") {
            alert("Please enter a task.");
            return; // إذا كانت القيمة فارغة، يظهر تنبيه
        }

        // إنشاء عنصر li جديد للمهمة
        const li = document.createElement('li');
        li.textContent = taskText;

        // إنشاء زر الحذف
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // إضافة حدث للحذف
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        // إضافة الزر داخل li
        li.appendChild(removeButton);
        
        // إضافة li إلى taskList
        taskList.appendChild(li);

        // مسح حقل الإدخال بعد إضافة المهمة
        taskInput.value = "";
    }

    // إضافة مستمع حدث للزر "Add Task"
    addButton.addEventListener('click', addTask);

    // إضافة مستمع حدث للمفتاح "Enter" لإضافة المهمة
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
