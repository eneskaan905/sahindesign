export async function checkSession() {
  return false
}

export async function login(_username: string, _password: string) {
  throw new Error('Yönetim paneli /admin adresindeki Sveltia CMS üzerinden açılır.')
}

export async function logout() {}

export async function saveContent(_content: unknown) {
  throw new Error('İçerik Sveltia CMS tarafından GitHub deposuna kaydedilir.')
}
