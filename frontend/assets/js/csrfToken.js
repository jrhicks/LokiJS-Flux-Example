export default function() {
  return $('meta[name="csrf-token"]').attr('content');
}
