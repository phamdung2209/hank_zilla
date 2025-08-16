# 🦖 Hank-Zilla

A lightweight React state management library that eliminates the need for Context, Redux, or Providers. Share state across components as easily as `useState` with global accessibility.

[![npm version](https://badge.fury.io/js/hank-zilla.svg)](https://badge.fury.io/js/hank-zilla)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

-   🚀 **No Provider Required**: Share state globally without wrapping components in Providers
-   🔄 **Drop-in Replacement**: Replace `useState` with `useAppState` for global state
-   🎯 **Access Anywhere**: Use the same state in any component, anywhere in your app
-   🪶 **Lightweight**: Zero dependencies, minimal bundle size (~2.1KB)
-   ⚡ **Fast**: Built on React's `useSyncExternalStore` for optimal performance
-   📦 **TypeScript**: Full TypeScript support with type inference

## 📦 Installation

```bash
npm install hank-zilla
```

## 🚀 Quick Start

```typescript
import { useAppState, setAppState, getAppState } from 'hank-zilla'

// Parent Component - Set state
function ParentComponent() {
    const user = useAppState('user', { name: '', email: '' })

    return (
        <div>
            <button
                onClick={() => setAppState('user', { name: 'John Doe', email: 'john@example.com' })}
            >
                Set User
            </button>
            <ChildComponent />
        </div>
    )
}

// Child Component - Access same state (no props needed!)
function ChildComponent() {
    const user = useAppState('user')

    return <div>{user ? `Welcome, ${user.name}!` : 'No user logged in'}</div>
}
```

## 📖 API Reference

### `useAppState(key, defaultValue?, removeOnUnmount?)`

React hook for managing global state - works exactly like `useState` but globally accessible.

```typescript
// Basic usage
const count = useAppState('count', 0)

// Auto-cleanup when component unmounts
const tempData = useAppState('tempData', null, true)

// TypeScript support
interface User {
    name: string
    email: string
}
const user = useAppState<User>('user', null)
```

### `setAppState(key, value)`

Update state from anywhere in your app - works with values or updater functions.

```typescript
// Set value directly
setAppState('count', 42)

// Update with function (like useState)
setAppState('count', (prev) => prev + 1)

// Update object (shallow merge)
setAppState('user', { name: 'John' })

// Update array
setAppState('items', (prev) => [...prev, 'new item'])
```

### `getAppState(key?)`

Get state value without subscribing to changes (no re-renders).

```typescript
// Get specific key
const currentCount = getAppState('count')

// Get all state
const allState = getAppState()

// ⚠️ Note: This doesn't trigger re-renders when state changes
```

### `$getAppState` (Console Helper)

Debug helper available in browser console to inspect your app state.

```javascript
// In browser console
$getAppState // Returns all state
$getAppState('key') // Returns specific key
```

## 🎯 Advanced Usage

### Auto-cleanup with `removeOnUnmount`

```typescript
function TemporaryComponent() {
    // This state will be deleted when component unmounts
    const [data, setData] = useAppState('tempData', [], true)

    return <div>Temporary data: {data.length} items</div>
}
```

### TypeScript Support

```typescript
interface CartItem {
    id: string
    name: string
    price: number
}

// Type inference
const [cart, setCart] = useAppState<CartItem[]>('cart', [])

// Add item with type safety
const addItem = (item: CartItem) => {
    setCart((prev) => [...prev, item])
}
```

### Performance: When to use `getAppState`

```typescript
// ✅ Good: Use useAppState for UI components
function Counter() {
    const [count, setCount] = useAppState('count', 0)
    return <div>Count: {count}</div> // Re-renders when count changes
}

// ✅ Good: Use getAppState for utilities/callbacks
function logCurrentState() {
    const count = getAppState('count')
    console.log('Current count:', count) // No re-renders
}
```

## 📊 Comparison

| Feature           | Hank-Zilla  | Context API       | Redux              | Zustand     |
| ----------------- | ----------- | ----------------- | ------------------ | ----------- |
| **Setup**         | ❌ None     | ✅ Provider       | ✅ Store + Actions | ✅ Store    |
| **Bundle Size**   | 🟢 ~1.3KB   | 🟢 Built-in       | 🔴 ~45KB           | 🟡 ~8KB     |
| **Global Access** | ✅ Anywhere | ❌ Provider scope | ✅ Anywhere        | ✅ Anywhere |
| **TypeScript**    | 🟢 Full     | 🟡 Manual         | 🟢 Full            | 🟢 Full     |

## 🔧 Migration

### From `useState` to `useAppState`

```typescript
// Before: Local state
const [count, setCount] = useState(0)

// After: Global state
const count = useAppState('count', 0)
```

### From Context API

```typescript
// Before: Complex setup
const UserContext = createContext()
const { user, setUser } = useContext(UserContext)

// After: Direct usage
const user = useAppState('user', null)
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ by [phamdung2209](https://github.com/phamdung2209) • Special thanks to the React team for `useSyncExternalStore`

---

Made with 🦖 by the Hank-Zilla team
