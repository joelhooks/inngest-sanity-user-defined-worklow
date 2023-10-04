import {inngest} from '@/inngest/inngest.client'

export default function Home() {
  async function triggerInngestEvent() {
    'use server'
    await inngest.send({
      name: 'marketing/new-account',
      data: {
        accountId: 123,
        leadEmail: 'hector@example.com',
        salesPersonEmail: 'veronica@company.com',
        status: 'new',
      },
    })
  }
  return (
    <main className="p-6">
      <h1 className="mb-3 text-3xl font-bold">
        Inngest User-Defined Workflows
      </h1>
      <div>
        <form action={triggerInngestEvent}>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Trigger Your Inngest Function!
          </button>
        </form>
      </div>
    </main>
  )
}
