export function validar(obj: Object | null){
  return Object.values(obj!).every(input=>input!=='')
}
