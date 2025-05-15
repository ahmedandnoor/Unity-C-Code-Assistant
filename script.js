const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;
const generateBtn = document.getElementById('generate-btn');
const responseBox = document.getElementById('response');

// Initialize theme from localStorage or default dark
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    toggleBtn.textContent = 'Dark Mode';
} else {
    toggleBtn.textContent = 'Light Mode';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

generateBtn.addEventListener('click', getResponse);

function getResponse() {
    const prompt = document.getElementById('prompt').value.toLowerCase();
    let response = '';

    if (prompt.includes('move') && prompt.includes('player')) {
        response = `// Move player script
using UnityEngine;

public class PlayerMovement : MonoBehaviour {
    public float speed = 5f;

    void Update() {
        float moveX = Input.GetAxis("Horizontal") * speed * Time.deltaTime;
        float moveZ = Input.GetAxis("Vertical") * speed * Time.deltaTime;
        transform.Translate(moveX, 0, moveZ);
    }
}`;
    } else if (prompt.includes('jump')) {
        response = `// Jump script
using UnityEngine;

public class PlayerJump : MonoBehaviour {
    public float jumpForce = 5f;
    private Rigidbody rb;

    void Start() {
        rb = GetComponent<Rigidbody>();
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.Space)) {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }
}`;
    } else if (prompt.includes('rotate') || prompt.includes('rotation')) {
        response = `// Rotate object
using UnityEngine;

public class RotateObject : MonoBehaviour {
    public float rotationSpeed = 100f;

    void Update() {
        transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);
    }
}`;
    } else if (prompt.includes('spawn') && prompt.includes('object')) {
        response = `// Spawning an object
using UnityEngine;

public class ObjectSpawner : MonoBehaviour {
    public GameObject prefab;

    void Update() {
        if (Input.GetKeyDown(KeyCode.E)) {
            Instantiate(prefab, transform.position, Quaternion.identity);
        }
    }
}`;
    } else if (prompt.includes('health') && prompt.includes('system')) {
        response = `// Simple health system
using UnityEngine;

public class HealthSystem : MonoBehaviour {
    public int maxHealth = 100;
    private int currentHealth;

    void Start() {
        currentHealth = maxHealth;
    }

    public void TakeDamage(int amount) {
        currentHealth -= amount;
        if (currentHealth <= 0) {
            Die();
        }
    }

    void Die() {
        Debug.Log("Player died");
        // Add death behavior here
    }
}`;
    } else if (prompt.includes('enemy') && prompt.includes('ai')) {
        response = `// Basic Enemy AI script
using UnityEngine;

public class EnemyAI : MonoBehaviour {
    public Transform player;
    public float speed = 3f;

    void Update() {
        if (player != null) {
            Vector3 direction = (player.position - transform.position).normalized;
            transform.position += direction * speed * Time.deltaTime;
        }
    }
}`;
    } else if (prompt.includes('shoot') || prompt.includes('shooting')) {
        response = `// Shooting script
using UnityEngine;

public class Shooter : MonoBehaviour {
    public GameObject bulletPrefab;
    public Transform firePoint;
    public float bulletSpeed = 10f;

    void Update() {
        if (Input.GetButtonDown("Fire1")) {
            GameObject bullet = Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);
            bullet.GetComponent<Rigidbody>().velocity = firePoint.forward * bulletSpeed;
        }
    }
}`;
    } else if (prompt.includes('ui') && prompt.includes('button')) {
        response = `// UI Button handler
using UnityEngine;
using UnityEngine.UI;

public class UIButtonHandler : MonoBehaviour {
    public Button myButton;

    void Start() {
        myButton.onClick.AddListener(OnButtonClick);
    }

    void OnButtonClick() {
        Debug.Log("Button clicked!");
    }
}`;
    } else if (prompt.includes('animation')) {
        response = `// Triggering an animation
using UnityEngine;

public class CharacterAnimator : MonoBehaviour {
    private Animator animator;

    void Start() {
        animator = GetComponent<Animator>();
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.W)) {
            animator.SetTrigger("Run");
        }
    }
}`;
    } else if (prompt.includes('sound') || prompt.includes('audio')) {
        response = `// Playing sound effect
using UnityEngine;

public class PlaySound : MonoBehaviour {
    public AudioSource audioSource;
    public AudioClip clip;

    void Update() {
        if (Input.GetKeyDown(KeyCode.Space)) {
            audioSource.PlayOneShot(clip);
        }
    }
}`;
    } else if (prompt.includes('2d') && prompt.includes('move')) {
        response = `// 2D player movement
using UnityEngine;

public class PlayerMovement2D : MonoBehaviour {
    public float moveSpeed = 5f;
    private Rigidbody2D rb;
    private Vector2 moveInput;

    void Start() {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update() {
        moveInput.x = Input.GetAxis("Horizontal");
        moveInput.y = Input.GetAxis("Vertical");
    }

    void FixedUpdate() {
        rb.MovePosition(rb.position + moveInput * moveSpeed * Time.fixedDeltaTime);
    }
}`;
    } else if (prompt.includes('inventory system')) {
        response = `// Basic Inventory System
using System.Collections.Generic;
using UnityEngine;

public class Inventory : MonoBehaviour {
    private List<string> items = new List<string>();

    public void AddItem(string item) {
        items.Add(item);
        Debug.Log("Added: " + item);
    }

    public void RemoveItem(string item) {
        if (items.Contains(item)) {
            items.Remove(item);
            Debug.Log("Removed: " + item);
        }
    }

    public void ShowInventory() {
        Debug.Log("Inventory:");
        foreach (string item in items) {
            Debug.Log(item);
        }
    }
}`;
    } else if (prompt.includes('mobile') && prompt.includes('touch') && prompt.includes('movement')) {
        response = `// Mobile Touch Movement
using UnityEngine;
using UnityEngine.EventSystems;

public class MobileTouchMovement : MonoBehaviour, IDragHandler {
    public float speed = 5f;
    private Vector2 inputVector;

    public void OnDrag(PointerEventData eventData) {
        inputVector = eventData.delta.normalized;
    }

    void Update() {
        Vector3 movement = new Vector3(inputVector.x, 0, inputVector.y) * speed * Time.deltaTime;
        transform.Translate(movement);
    }
}`;
    } else if (prompt.includes('pause') && (prompt.includes('game') || prompt.includes('resume'))) {
        response = `// Pause and Resume Game
using UnityEngine;

public class PauseManager : MonoBehaviour {
    private bool isPaused = false;

    void Update() {
        if (Input.GetKeyDown(KeyCode.Escape)) {
            if (isPaused) {
                ResumeGame();
            } else {
                PauseGame();
            }
        }
    }

    public void PauseGame() {
        Time.timeScale = 0f;
        isPaused = true;
        Debug.Log("Game paused");
    }

    public void ResumeGame() {
        Time.timeScale = 1f;
        isPaused = false;
        Debug.Log("Game resumed");
    }
}`;
    } else if (prompt.includes('save') && prompt.includes('load') && prompt.includes('player')) {
        response = `// Save and Load Player Data
using UnityEngine;

public class PlayerDataManager : MonoBehaviour {
    public int playerScore;
    public float playerHealth;

    public void SavePlayerData() {
        PlayerPrefs.SetInt("Score", playerScore);
        PlayerPrefs.SetFloat("Health", playerHealth);
        PlayerPrefs.Save();
        Debug.Log("Player data saved");
    }

    public void LoadPlayerData() {
        playerScore = PlayerPrefs.GetInt("Score", 0);
        playerHealth = PlayerPrefs.GetFloat("Health", 100f);
        Debug.Log("Player data loaded");
    }
}`;
    } else if (prompt.includes('scene') && prompt.includes('switching')) {
        response = `// Scene Switching
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwitcher : MonoBehaviour {
    public void SwitchToScene(string sceneName) {
        SceneManager.LoadScene(sceneName);
    }
}`;
    } else {
        response = `Sorry, I don't have a code snippet for that yet. Try asking about:
- movement, jumping, spawning,
- health systems, rotation,
- enemy AI, shooting,
- UI buttons, animations,
- sound effects, 2D support,
- inventory system,
- mobile touch movement,
- pause/resume game,
- save/load player data,
- scene switching.`;
    }

    responseBox.textContent = response;
}
