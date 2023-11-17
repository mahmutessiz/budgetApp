import { onMounted } from 'vue'

export default function useIntersectionObserver() {
  onMounted(() => {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    })

    sections.forEach((section) => {
      observer.observe(section)
    })
  })
}
