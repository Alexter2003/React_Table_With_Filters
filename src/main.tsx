import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FilterTable from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <FilterTable />

  </StrictMode >,
)
